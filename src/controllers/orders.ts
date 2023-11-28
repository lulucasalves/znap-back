import { Next, Request, Response } from "restify";
import { In, getRepository } from "typeorm";

import { MasterOrders, Orders } from "../models";

export async function getOrdersController(
  req: Request,
  res: Response,
  next: Next
) {
  const { limit, page, order, sort } = req.query;

  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const masterOrdersRepository = getRepository(MasterOrders);
  const ordersRepository = getRepository(Orders);

  const master_orders = await masterOrdersRepository.findAndCount({
    skip: (currentInt - 1) * limitInt,
    take: limitInt,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
    relations: ["client_id"],
  });

  let masterOrdersData = master_orders[0].map((value) => ({
    ...value,
    orders: [],
  }));

  const orders = await ordersRepository.findAndCount({
    where: { master_order_id: In(master_orders[0].map((value) => value.id)) },
    relations: ["master_order_id", "product_id"],
  });

  for (const order of orders[0].map((value) => ({
    ...value,
    master_order_id: value.master_order_id.id,
  }))) {
    const otherMasterOrdersData = masterOrdersData.filter(
      (value) => value.id !== (order.master_order_id as unknown as string)
    ) as any;

    const masterOrderData = masterOrdersData.filter(
      (value) => value.id === (order.master_order_id as unknown as string)
    )[0];

    masterOrdersData = [
      ...otherMasterOrdersData,
      { ...masterOrderData, orders: [...masterOrderData.orders, order] },
    ];
  }

  console.log(orders);

  res.json({
    data: masterOrdersData,
    count: master_orders[1],
    page: currentInt,
    limit: limitInt,
    maxPages: Math.ceil(master_orders[1] / limitInt),
  });
}

export async function getMasterOrderController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const masterOrdersRepository = getRepository(MasterOrders);
  const ordersRepository = getRepository(Orders);

  const masterOrders = (await masterOrdersRepository.findOne({
    relations: ["client_id"],
    where: { id },
  })) as any;

  const allOrders = await ordersRepository.find({
    where: { master_order_id: { id: id } },
    relations: ["product_id"],
  });

  res.json({ ...masterOrders, orders: allOrders });
}

export async function postOrdersNewController(
  req: Request,
  res: Response,
  next: Next
) {
  const { orders, data } = req.body;

  const masterOrdersRepository = getRepository(MasterOrders);

  const createMasterOrder = masterOrdersRepository.create(data);

  const createdMaster = (await masterOrdersRepository.save(
    createMasterOrder
  )) as any;

  let result = { ...createdMaster, orders };

  for (const order of orders) {
    const ordersRepository = getRepository(Orders);

    const createOrder = ordersRepository.create({
      ...order,
      master_order_id: createdMaster.id,
    });

    const createdOrder = await ordersRepository.save(createOrder);

    result = { ...result, orders: [createdOrder, ...result.orders] };
  }

  res.json(result);
}

export async function postOrdersController(
  req: Request,
  res: Response,
  next: Next
) {
  const body = req.body;

  const ordersRepository = getRepository(Orders);

  const createOrder = ordersRepository.create(body);

  const createdOrder = await ordersRepository.save(createOrder);

  res.json(createdOrder);
}
