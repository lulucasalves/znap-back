import { Clients } from "../../models";

import { getRepository } from "typeorm";

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
}: IGetClients) {
  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const limitQuery = limit ? limitInt : 15;
  const pageQuery = limit ? currentInt : 1;

  const clientsRepository = getRepository(Clients);

  const clients = await clientsRepository.findAndCount({
    skip: (pageQuery - 1) * limitQuery,
    take: limitQuery,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
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

  const createClient = clientsRepository.create(body);

  const createdClient = await clientsRepository.save(createClient);

  return createdClient;
}

export async function putClientService({ body, id }: IChangeClient) {
  const clientsRepository = getRepository(Clients);

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

  const deleteClient = await clientsRepository.delete({
    id,
  });

  return deleteClient;
}

export async function getClientService({ id }: IGetClient) {
  const clientsRepository = getRepository(Clients);

  const client = await clientsRepository.findOne({
    where: { id },
  });

  if (!client) throw new Error("Cliente não encontrado");

  return client;
}
