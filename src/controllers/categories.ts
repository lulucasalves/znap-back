import { ProductCategories } from "../models";
import { Next, Request, Response } from "restify";
import { getRepository } from "typeorm";

export async function getProductCategoriesController(
  req: Request,
  res: Response,
  next: Next
) {
  const { limit, page, order } = req.query;

  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const categoriesRepository = getRepository(ProductCategories);

  const categories = await categoriesRepository.findAndCount({
    skip: (currentInt - 1) * limitInt,
    take: limitInt,
  });

  res.json(categories);
}

export async function postProductCategoriesController(
  req: Request,
  res: Response,
  next: Next
) {
  const body = req.body;

  const categoriesRepository = getRepository(ProductCategories);

  const createCategory = categoriesRepository.create(body);

  const createdCategory = await categoriesRepository.save(createCategory);

  res.json(createdCategory);
}

export async function putProductCategoriesController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;
  const body = req.body;

  const categoriesRepository = getRepository(ProductCategories);

  const createdCategory = await categoriesRepository.update(
    {
      id,
    },
    { ...body, updated_at: new Date() }
  );

  res.json(createdCategory);
}
