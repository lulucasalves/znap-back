import { ProductCategories } from "../models";
import { Next, Request, Response } from "restify";
import { getRepository } from "typeorm";

export async function getProductCategoriesController(
  req: Request,
  res: Response,
  next: Next
) {
  const { limit, page, order, sort } = req.query;

  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const categoriesRepository = getRepository(ProductCategories);

  const categories = await categoriesRepository.findAndCount({
    skip: (currentInt - 1) * limitInt,
    take: limitInt,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
  });

  res.json({
    data: categories[0],
    count: categories[1],
    page: currentInt,
    limit: limitInt,
    maxPages: Math.ceil(categories[1] / limitInt),
  });
}

export async function postProductCategoryController(
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

export async function getProductCategoryController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const categoriesRepository = getRepository(ProductCategories);

  const category = await categoriesRepository.findOne({
    where: { id },
  });

  res.json(category);
}

export async function deleteProductCategoryController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const categoriesRepository = getRepository(ProductCategories);

  const category = await categoriesRepository.delete({
    id,
  });

  res.json(category);
}

export async function putProductCategoryController(
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
