import { Equal, ILike, Not, getRepository } from "typeorm";
import {
  IChangeProductCategory,
  ICreateProductCategory,
  IGetProductCategories,
  IGetProductCategory,
} from "./interfaces";

import { ProductCategories, Products } from "../../models";

export async function getProductCategoriesService({
  limit,
  page,
  order,
  sort,
  filter,
  active,
}: IGetProductCategories) {
  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const activeQuery = active === "true" ? true : false;
  const limitQuery = limit ? limitInt : 15;
  const pageQuery = limit ? currentInt : 1;

  const categoriesRepository = getRepository(ProductCategories);

  let where: any = { is_deletable: 1 };

  if (filter) {
    where = { ...where, name: ILike(`%${filter}%`) };
  }

  if (activeQuery) {
    where = { ...where, available: activeQuery };
  }

  const categories = await categoriesRepository.findAndCount({
    skip: (pageQuery - 1) * limitQuery,
    take: limitQuery,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
    where,
  });

  return {
    data: categories[0],
    count: categories[1],
    page: pageQuery,
    limit: limitQuery,
    maxPages: Math.ceil(categories[1] / limitQuery),
  };
}

export async function postProductCategoryService({
  body,
}: ICreateProductCategory) {
  const categoriesRepository = getRepository(ProductCategories);

  const createCategory = categoriesRepository.create(body);

  const createdCategory = await categoriesRepository.save(createCategory);

  return createdCategory;
}

export async function getProductCategoryService({ id }: IGetProductCategory) {
  const categoriesRepository = getRepository(ProductCategories);

  const category = await categoriesRepository.findOne({
    where: { id },
  });

  if (!category) throw new Error("Categoria não encontrada");

  return category;
}

export async function deleteProductCategoryService({
  id,
}: IGetProductCategory) {
  const categoriesRepository = getRepository(ProductCategories);

  const productsRepository = getRepository(Products);

  const categoryNoCategory = await categoriesRepository.findOne({
    where: { name: "Sem categoria" },
  });

  if (!categoryNoCategory)
    throw new Error("Não foi possível trocar a categoria dos produtos");

  await productsRepository.update(
    {
      category_id: id as any,
    },
    { category_id: categoryNoCategory!.id as any }
  );

  const category = await categoriesRepository.delete({
    id,
  });

  return category;
}

export async function putProductCategoryService({
  id,
  body,
}: IChangeProductCategory) {
  const categoriesRepository = getRepository(ProductCategories);

  const createdCategory = await categoriesRepository.update(
    {
      id,
    },
    { ...body, updated_at: new Date() }
  );

  return createdCategory;
}
