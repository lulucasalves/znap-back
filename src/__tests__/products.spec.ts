import request from "supertest";
import { testCreate, deleteFromTable, urlTest } from "./testConfig";

describe("Products test route", () => {
  afterAll(async () => await deleteFromTable());

  it("Return status 200 and 201 from products routes", async () => {
    const getCategories = await request(urlTest).get("/categories");

    const sendProduct = await request(urlTest).post(`/product`).send({
      name: testCreate,
      price: 0,
      category_id: getCategories.body.data[0].id,
    });
    const getProducts = await request(urlTest).get("/products");
    const getProduct = await request(urlTest).get(
      `/product/${sendProduct.body.id}`
    );
    const putProduct = await request(urlTest)
      .put(`/product/${getProduct.body.id}`)
      .send({
        price: 10,
        name: testCreate,
      });
    const deleteProduct = await request(urlTest).delete(
      `/product/${getProduct.body.id}`
    );

    expect(getProducts.status).toBe(200);
    expect(getProduct.status).toBe(200);
    expect(putProduct.status).toBe(200);
    expect(deleteProduct.status).toBe(200);
    expect(sendProduct.status).toBe(201);
  });
});
