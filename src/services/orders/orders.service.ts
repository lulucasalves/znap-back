import { Orders } from "../../models";
import { IChangeOrder, ICreateOrder, IGetOrder } from "./interfaces";
import { getRepository } from "typeorm";

export async function postOrderService({ body }: ICreateOrder) {
  const ordersRepository = getRepository(Orders);

  const createOrder = ordersRepository.create(body);

  const createdOrder = await ordersRepository.save(createOrder);

  return createdOrder;
}

export async function putOrderService({ id, body }: IChangeOrder) {
  const ordersRepository = getRepository(Orders);

  const updateOrder = await ordersRepository.update(
    { id },
    { ...body, updated_at: new Date() }
  );

  return updateOrder;
}

export async function deleteOrderService({ id }: IGetOrder) {
  const ordersRepository = getRepository(Orders);

  const deletedOrder = await ordersRepository.delete({ id });

  return deletedOrder;
}

export async function getOrderService({ id }: IGetOrder) {
  const ordersRepository = getRepository(Orders);

  const getOrder = await ordersRepository.findOne({
    where: { id },
    relations: ["product_id"],
  });

  if (!getOrder) throw new Error("Pedido não encontrado");

  return getOrder;
}
