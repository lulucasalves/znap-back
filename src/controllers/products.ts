import { Products } from "../models";
import { Next, Request, Response } from "restify";
import { getRepository } from "typeorm";

export function getProductsController(req: Request, res: Response, next: Next) {
  const { limit, page, order, categories } = req.query;

  const productRepository = getRepository(Products);

  const products = productRepository.find();
  res.json(products);
}
