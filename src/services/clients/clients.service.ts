import { Clients, MasterOrders, Orders } from "../../models";

import { ILike, getManager, getRepository } from "typeorm";

import {
  IChangeClient,
  ICreateClient,
  IGetClients,
  IGetClient,
} from "./interfaces";

export async function getClientsService({
  limit,
  page,
  order,
  sort,
  filter,
}: IGetClients) {
  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const limitQuery = limit ? limitInt : 15;
  const pageQuery = limit ? currentInt : 1;

  const clientsRepository = getRepository(Clients);

  let whereConditions = {};

  if (filter) {
    whereConditions = {
      where: [
        { name: ILike(`%${filter}%`) },
        { email: ILike(`%${filter}%`) },
        { phone: ILike(`%${filter}%`) },
      ],
    };
  }

  const clients = await clientsRepository.findAndCount({
    skip: (pageQuery - 1) * limitQuery,
    take: limitQuery,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
    ...whereConditions,
  });

  return {
    data: clients[0],
    count: clients[1],
    page: pageQuery,
    limit: limitQuery,
    maxPages: Math.ceil(clients[1] / limitQuery),
  };
}

export async function postClientService({ body }: ICreateClient) {
  const clientsRepository = getRepository(Clients);

  const findDuplicated = await clientsRepository.findOne({
    where: {
      ...body,
    },
  });

  if (findDuplicated) throw new Error("Cliente duplicado!");

  const createClient = clientsRepository.create(body);

  const createdClient = await clientsRepository.save(createClient);

  return createdClient;
}

export async function putClientService({ body, id }: IChangeClient) {
  const clientsRepository = getRepository(Clients);

  const findDuplicated = await clientsRepository.findOne({
    where: {
      ...body,
    },
  });

  if (findDuplicated) throw new Error("Cliente duplicado!");

  const editClient = await clientsRepository.update(
    {
      id,
    },
    { ...body, updated_at: new Date() }
  );

  return editClient;
}

export async function deleteClientService({ id }: IGetClient) {
  const clientsRepository = getRepository(Clients);
  const masterOrdersRepository = getRepository(MasterOrders);
  const ordersRepository = getRepository(Orders);

  const entityManager = getManager();

  const [getMasterOrder] = await entityManager.query(
    `SELECT id FROM master_orders WHERE client_id = '${id}'`
  );

  if (getMasterOrder) {
    await ordersRepository.delete({
      master_order_id: getMasterOrder!.id as any,
    });

    await masterOrdersRepository.delete({
      id: getMasterOrder!.id,
    });
  }

  const deletedComponent = await clientsRepository.delete({
    id,
  });

  return { deletedComponent };
}

export async function getClientService({ id }: IGetClient) {
  const clientsRepository = getRepository(Clients);

  const client = await clientsRepository.findOne({
    where: { id },
  });

  if (!client) throw new Error("Cliente não encontrado");

  return client;
}
