import { Next, Request, Response } from "restify";
import { getRepository } from "typeorm";

import { Clients } from "../models";

export async function getClientsController(
  req: Request,
  res: Response,
  next: Next
) {
  const { limit, page, order, sort } = req.query;

  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const clientsRepository = getRepository(Clients);

  const clients = await clientsRepository.findAndCount({
    skip: (currentInt - 1) * limitInt,
    take: limitInt,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
  });

  res.json({
    data: clients[0],
    count: clients[1],
    page: currentInt,
    limit: limitInt,
    maxPages: Math.ceil(clients[1] / limitInt),
  });
}

export async function postClientController(
  req: Request,
  res: Response,
  next: Next
) {
  const body = req.body;

  const clientsRepository = getRepository(Clients);

  const createClient = clientsRepository.create(body);

  const createdClient = await clientsRepository.save(createClient);

  res.json(createdClient);
}

export async function putClientController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;
  const body = req.body;

  const clientsRepository = getRepository(Clients);

  const createdClient = await clientsRepository.update(
    {
      id,
    },
    { ...body, updated_at: new Date() }
  );

  res.json(createdClient);
}

export async function deleteClientController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const clientsRepository = getRepository(Clients);

  const deleteClient = await clientsRepository.delete({
    id,
  });

  res.json(deleteClient);
}

export async function getClientController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const clientsRepository = getRepository(Clients);

  const client = await clientsRepository.findOne({
    where: { id },
  });

  res.json(client);
}
