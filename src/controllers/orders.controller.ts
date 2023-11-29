import { Next, Request, Response } from "restify";

import {
  deleteOrderService,
  getOrderService,
  postOrderService,
  putOrderService,
} from "../services";

export async function postOrderController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const data = await postOrderService({ body: req.body });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      default:
        res.json({ error: true, message: "Erro ao criar o pedido" });
        break;
    }
  }
}

export async function putOrderController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await putOrderService({ id, body: req.body });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      default:
        res.json({ error: true, message: "Erro ao editar o pedido" });
        break;
    }
  }
}

export async function deleteOrderController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await deleteOrderService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      default:
        res.json({ error: true, message: "Erro ao deletar o pedido" });
        break;
    }
  }
}

export async function getOrderController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await getOrderService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.status(404);
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar o pedido" });
        break;
    }
  }
}
