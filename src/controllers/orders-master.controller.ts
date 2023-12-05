import { Next, Request, Response } from "restify";
import { getRepository } from "typeorm";

import { MasterOrders, Orders } from "../models";
import {
  deleteMasterOrderService,
  getMasterOrderService,
  getMasterOrdersService,
  postMasterOrdersService,
  putMasterOrdersService,
} from "../services";

export async function getMasterOrdersController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const {
      limit,
      page,
      order,
      sort,
      categories,
      products,
      dateFrom,
      dateTo,
      clients,
    } = req.query;

    const data = await getMasterOrdersService({
      limit,
      page,
      order,
      sort,
      categories,
      products,
      dateFrom,
      dateTo,
      clients,
    });

    res.json(data);
  } catch (err: any) {
    res.status(400);
    console.log(err);
    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar os pedidos" });
        break;
    }
  }
}

export async function getMasterOrderController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await getMasterOrderService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.status(404);
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar os pedidos" });
        break;
    }
  }
}

export async function postMasterOrdersController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const data = await postMasterOrdersService({ body: req.body });

    res.status(201);
    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao criar pedidos" });
        break;
    }
  }
}

export async function putMasterOrdersController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await putMasterOrdersService({ body: req.body, id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao editar os pedidos" });
        break;
    }
  }
}

export async function deleteMasterOrdersController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await deleteMasterOrderService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao deletar os pedidos" });
        break;
    }
  }
}
