import { Products } from "../models";
import { Next, Request, Response } from "restify";
import { getRepository } from "typeorm";

export async function getProductsController(
  req: Request,
  res: Response,
  next: Next
) {
  const { limit, page, order, sort } = req.query;

  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const productsRepository = getRepository(Products);

  const products = await productsRepository.findAndCount({
    skip: (currentInt - 1) * limitInt,
    take: limitInt,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
    relations: ["category_id"],
  });

  res.json({
    data: products[0],
    count: products[1],
    page: currentInt,
    limit: limitInt,
    maxPages: Math.ceil(products[1] / limitInt),
  });
}

export async function postProductController(
  req: Request,
  res: Response,
  next: Next
) {
  const body = req.body;

  const productsRepository = getRepository(Products);

  const createProduct = productsRepository.create(body);

  const createdProduct = await productsRepository.save(createProduct);

  res.json(createdProduct);
}

export async function getProductController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const productsRepository = getRepository(Products);

  const product = await productsRepository.findOne({
    where: { id },
    relations: ["category_id"],
  });

  res.json(product);
}

export async function putProductController(
  req: Request,
  res: Response,
  next: Next
) {
  const body = req.body;
  const { id } = req.params;

  const productsRepository = getRepository(Products);

  const product = productsRepository.update(
    {
      id,
    },
    { ...body, updated_at: new Date() }
  );

  res.json(product);
}

export async function deleteProductController(
  req: Request,
  res: Response,
  next: Next
) {
  const { id } = req.params;

  const productsRepository = getRepository(Products);

  const product = productsRepository.delete({
    id,
  });

  res.json(product);
}
