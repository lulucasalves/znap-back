import { getRepository } from "typeorm";
import {
  IChangeProductCategory,
  ICreateProductCategory,
  IGetProductCategories,
  IGetProductCategory,
} from "./interfaces";

import { ProductCategories } from "../../models";

export async function getProductCategoriesService({
  limit,
  page,
  order,
  sort,
}: IGetProductCategories) {
  const limitInt = parseInt(limit);
  const currentInt = parseInt(page);

  const limitQuery = limit ? limitInt : 15;
  const pageQuery = limit ? currentInt : 1;

  const categoriesRepository = getRepository(ProductCategories);

  const categories = await categoriesRepository.findAndCount({
    skip: (pageQuery - 1) * limitQuery,
    take: limitQuery,
    order: { [order ?? "created_at"]: sort ?? "DESC" },
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
