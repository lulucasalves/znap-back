import { getManager, getRepository } from "typeorm";
import {
  IChangeOrderMaster,
  ICreateOrderMaster,
  IGetOrderMaster,
  IGetOrdersMaster,
} from "./interfaces";
import { MasterOrders, Orders } from "../../models";
import { format } from "date-fns";
import { getMastersWhere } from "./utils/getMasters";

export async function getMasterOrdersService({
  limit,
  page,
  order,
  sort,
  categories,
  products,
  clients,
  dateFrom,
  dateTo,
}: IGetOrdersMaster) {
  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd");

  const dateFromQuery = dateFrom ?? "0001-01-01";
  const dateToQuery = dateTo ?? formattedDate;
  const orderQuery = order ?? "created_at";
  const sortQuery = sort ?? "DESC";
  const pageQuery = page ? currentInt : 1;
  const offsetQuery = limit && page ? (currentInt - 1) * limitInt : 0;
  const limitQuery = limit ? limitInt : 15;
  const categoriesQuery = categories
    ? categories
        .split(",")
        .map((value) => `'${value}'`)
        .join(",")
    : "";
  const clientsQuery = clients
    ? clients
        .split(",")
        .map((value) => `'${value}'`)
        .join(",")
    : "";
  const productsQuery = products
    ? products
        .split(",")
        .map((value) => `'${value}'`)
        .join(",")
    : "";
  const entityManager = getManager();
  const where = getMastersWhere({
    dateFromQuery,
    dateToQuery,
    clientsQuery,
    categoriesQuery,
    productsQuery,
  });

  let queryBuilder = await entityManager.query(
    `
    SELECT
    DISTINCT(mo.id),
    mo.shipping,
    mo.date,
    mo.created_at,
    mo.updated_at,
    CONCAT('{ "id": "', c.id, '", "name": "', c.name, '" }') AS client,
    (
      SELECT COUNT(*) AS count
      FROM orders o_select
      WHERE o_select.master_order_id = mo.id
    ) AS number_orders,
    (
        SELECT CAST(SUM(o_select.quantity) AS DECIMAL) AS quantity
        FROM orders o_select
        WHERE o_select.master_order_id = mo.id
    ) AS total_quantity,
    (
        SELECT CAST(SUM(o_select.price * o_select.quantity) AS DECIMAL)
        FROM orders o_select
        WHERE o_select.master_order_id = mo.id
    ) AS total_price,
    (
        SELECT CAST(SUM(o_select.price * o_select.quantity) AS DECIMAL) / CAST(SUM(o_select.quantity) AS DECIMAL)
        FROM orders o_select
        WHERE o_select.master_order_id = mo.id
    ) AS average_price
    FROM master_orders as mo
    INNER JOIN clients as c ON c.id = mo.client_id
    INNER JOIN orders as o ON o.master_order_id = mo.id
    INNER JOIN products as p ON o.product_id = p.id
    ${where}
    ORDER BY ${orderQuery} ${sortQuery}
    LIMIT ${limitQuery}
    OFFSET ${offsetQuery}
    `
  );

  const master_orders_count_query = await entityManager.query(`
    SELECT COUNT(DISTINCT mo.id) as count FROM master_orders as mo
    INNER JOIN clients as c ON c.id = mo.client_id
    INNER JOIN orders as o ON o.master_order_id = mo.id
    INNER JOIN products as p ON o.product_id = p.id
    ${where}
  `);

  const master_orders_count = parseInt(master_orders_count_query[0].count);

  const data = queryBuilder.map((val: any) => {
    return {
      ...val,
      client: JSON.parse(val.client),
    };
  });

  return {
    data,
    count: master_orders_count,
    page: pageQuery,
    limit: limitQuery,
    maxPages: Math.ceil(master_orders_count / limitQuery),
  };
}

export async function getMasterOrderService({ id }: IGetOrderMaster) {
  const masterOrdersRepository = getRepository(MasterOrders);
  const ordersRepository = getRepository(Orders);

  const masterOrders = (await masterOrdersRepository.findOne({
    relations: ["client_id"],
    where: { id },
  })) as any;

  if (!masterOrders) throw new Error("Pedidos não encontrados");

  const allOrders = await ordersRepository.find({
    where: { master_order_id: { id: id } },
    relations: ["product_id"],
  });

  return { ...masterOrders, orders: allOrders };
}

export async function postMasterOrdersService({ body }: ICreateOrderMaster) {
  const masterOrdersRepository = getRepository(MasterOrders);

  const createMasterOrder = masterOrdersRepository.create(body);

  const createdMaster = await masterOrdersRepository.save(createMasterOrder);

  return createdMaster;
}

export async function putMasterOrdersService({ body, id }: IChangeOrderMaster) {
  const masterOrdersRepository = getRepository(MasterOrders);

  const editMasterOrder = await masterOrdersRepository.update(
    { id },
    { ...body, updated_at: new Date() }
  );

  return editMasterOrder;
}

export async function deleteMasterOrderService({ id }: IGetOrderMaster) {
  const masterOrdersRepository = getRepository(MasterOrders);
  const ordersRepository = getRepository(Orders);

  const deleteOrders = await ordersRepository.delete({
    master_order_id: id as any,
  });
  const deleteMasterOrder = await masterOrdersRepository.delete({ id });

  return { deleteMasterOrder, deleteOrders };
}
