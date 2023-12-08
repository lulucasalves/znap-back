import { Next, Request, Response } from "restify";

import {
  deleteClientService,
  getClientService,
  getClientsService,
  postClientService,
  putClientService,
} from "../services";

export async function getClientsController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { limit, page, order, sort, filter } = req.query;

    const data = await getClientsService({ limit, sort, order, page, filter });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar clientes" });
        break;
    }
  }
}

export async function postClientController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const data = await postClientService({ body: req.body });

    res.status(201);
    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao criar cliente" });
        break;
    }
  }
}

export async function putClientController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await putClientService({ body: req.body, id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao editar cliente" });
        break;
    }
  }
}

export async function deleteClientController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await deleteClientService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao deletar cliente" });
        break;
    }
  }
}

export async function getClientController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await getClientService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.status(404);
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar os clientes" });
        break;
    }
  }
}
