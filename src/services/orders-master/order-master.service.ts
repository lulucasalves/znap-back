import { getRepository } from "typeorm";
import {
  IChangeOrderMaster,
  ICreateOrderMaster,
  IGetOrderMaster,
  IGetOrdersMaster,
} from "./interfaces";
import { MasterOrders, Orders } from "../../models";

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

  const masterOrdersRepository = getRepository(MasterOrders);

  const orderQuery = order ?? "mo.created_at";
  const sortQuery = sort ?? "DESC";
  const pageQuery = page ? currentInt : 1;
  const offsetQuery = limit && page ? (currentInt - 1) * limitInt : 0;
  const limitQuery = limit ? limitInt : 15;
  const categoriesQuery = categories ? categories.split(",") : [];
  const clientsQuery = clients ? clients.split(",") : [];
  const productsQuery = products ? products.split(",") : [];

  let queryBuilder = masterOrdersRepository
    .createQueryBuilder("mo")
    .innerJoin("mo.client_id", "c")
    // .leftJoinAndSelect("mo.orders", "orders")
    .orderBy(orderQuery, sortQuery)
    .limit(limitQuery)
    .offset(offsetQuery)
    .select(["mo", "c"])
    .addSelect((subQuery) => {
      return subQuery
        .select("COUNT(*)", "count")
        .from("orders", "o")
        .where("o.master_order_id = mo.id");
    }, "number_orders")
    .addSelect((subQuery) => {
      return subQuery
        .select("CAST(SUM(o.quantity) AS DECIMAL)", "quantity")
        .from("orders", "o")
        .where("o.master_order_id = mo.id");
    }, "total_quantity")
    .addSelect((subQuery) => {
      return subQuery
        .select("CAST(SUM(price*quantity) AS DECIMAL)", "price, quantity")
        .from("orders", "o")
        .where("o.master_order_id = mo.id");
    }, "total_price")
    .addSelect((subQuery) => {
      return subQuery
        .select(
          "CAST(SUM(price*quantity) AS DECIMAL) / CAST(SUM(o.quantity) AS DECIMAL)",
          "price, quantity"
        )
        .from("orders", "o")
        .where("o.master_order_id = mo.id");
    }, "average_price");

  if (clientsQuery.length) {
    queryBuilder.andWhere("mo.client_id IN(:clients)", {
      clients: clientsQuery.join(","),
    });
  }

  const master_orders = await queryBuilder.getRawMany();
  const master_orders_count = await queryBuilder.getCount();

  return {
    data: master_orders,
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

  const deleteMasterOrder = await masterOrdersRepository.delete({ id });

  return deleteMasterOrder;
}
