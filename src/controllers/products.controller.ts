import {
  deleteProductService,
  getProductService,
  getProductsService,
  postProductService,
  putProductService,
} from "../services";
import { Next, Request, Response } from "restify";

export async function getProductsController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { limit, page, order, sort, categories } = req.query;

    const data = await getProductsService({
      limit,
      page,
      order,
      sort,
      categories,
    });

    res.json(data);
  } catch (err: any) {
    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar produtos" });
        break;
    }
  }
}

export async function postProductController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const data = await postProductService({ body: req.body });

    res.status(201);
    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao criar novo produto" });
        break;
    }
  }
}

export async function getProductController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await getProductService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.status(404);
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar o produto" });
        break;
    }
  }
}

export async function putProductController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await putProductService({ id, body: req.body });

    res.json(data);
  } catch (err: any) {
    res.status(400);
    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao editar o produto" });
        break;
    }
  }
}

export async function deleteProductController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await deleteProductService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao remover o produto" });
        break;
    }
  }
}
