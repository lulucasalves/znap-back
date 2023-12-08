import { In, getRepository } from "typeorm";
import {
  IChangeProduct,
  ICreateProduct,
  IGetProduct,
  IGetProducts,
} from "./interfaces";
import { Orders, Products } from "../../models";

export async function getProductsService({
  limit,
  order,
  page,
  sort,
  categories,
}: IGetProducts) {
  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const limitQuery = limit ? limitInt : 15;
  const pageQuery = limit ? currentInt : 1;
  const categoriesQuery = categories ? categories.split(",") : [];

  const productsRepository = getRepository(Products);

  const products = await productsRepository.findAndCount({
    skip: (pageQuery - 1) * limitQuery,
    take: limitQuery,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
    relations: ["category_id"],
    where: categoriesQuery.length ? { category_id: In(categoriesQuery) } : {},
  });

  return {
    data: products[0],
    count: products[1],
    page: pageQuery,
    limit: limitQuery,
    maxPages: Math.ceil(products[1] / limitQuery),
  };
}

export async function postProductService({ body }: ICreateProduct) {
  const productsRepository = getRepository(Products);

  const findDuplicated = await productsRepository.findOne({
    where: {
      name: body.name,
    },
  });

  if (findDuplicated) {
    throw new Error("Produto duplicado!");
  }

  const createProduct = productsRepository.create(body);

  const createdProduct = await productsRepository.save(createProduct);

  return createdProduct;
}

export async function getProductService({ id }: IGetProduct) {
  const productsRepository = getRepository(Products);

  const product = await productsRepository.findOne({
    where: { id },
    relations: ["category_id"],
  });

  if (!product) throw new Error("Produto não encontrado");

  return product;
}

export async function putProductService({ id, body }: IChangeProduct) {
  const productsRepository = getRepository(Products);

  const findDuplicated = await productsRepository.find({
    where: {
      name: body.name,
    },
  });

  console.log(findDuplicated);

  if (findDuplicated.length > 1) throw new Error("Produto duplicado!");

  const product = await productsRepository.update(
    {
      id,
    },
    { ...body, updated_at: new Date() }
  );

  return product;
}

export async function deleteProductService({ id }: IGetProduct) {
  const productsRepository = getRepository(Products);
  const ordersRepository = getRepository(Orders);

  const orders = await ordersRepository.delete({
    product_id: id as any,
  });

  const product = await productsRepository.delete({
    id,
  });

  return { product, orders };
}
