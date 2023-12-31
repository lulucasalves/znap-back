import {
  deleteProductCategoryService,
  getProductCategoriesService,
  getProductCategoryService,
  postProductCategoryService,
  putProductCategoryService,
} from "../services";
import { Next, Request, Response } from "restify";

export async function getProductCategoriesController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { limit, page, order, sort, filter, active } = req.query;

    const data = await getProductCategoriesService({
      limit,
      page,
      order,
      sort,
      filter,
      active,
    });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar as categorias" });
        break;
    }
  }
}

export async function postProductCategoryController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const data = await postProductCategoryService({ body: req.body });

    res.status(201);
    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case (err.sqlMessage && err.sqlMessage.includes("Duplicate entry")) ||
        err.message.includes("key"):
        res.json({ error: true, message: "Categoria duplicada" });
        break;
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao criar nova categoria" });
        break;
    }
  }
}

export async function getProductCategoryController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await getProductCategoryService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.status(404);
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao procurar a categoria" });
        break;
    }
  }
}

export async function deleteProductCategoryController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await deleteProductCategoryService({ id });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao remover a categoria" });
        break;
    }
  }
}

export async function putProductCategoryController(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const { id } = req.params;

    const data = await putProductCategoryService({ id, body: req.body });

    res.json(data);
  } catch (err: any) {
    res.status(400);

    switch (true) {
      case (err.sqlMessage && err.sqlMessage.includes("Duplicate entry")) ||
        err.message.includes("key"):
        res.json({ error: true, message: "Categoria duplicada" });
        break;
      case err.message !== undefined:
        res.json({ error: true, message: err.message });
        break;
      default:
        res.json({ error: true, message: "Erro ao editar a categoria" });
        break;
    }
  }
}
