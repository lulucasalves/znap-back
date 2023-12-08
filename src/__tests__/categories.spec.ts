import request from "supertest";
import { testCreate, deleteFromTable, urlTest } from "./testConfig";

describe("Categories test route", () => {
  afterAll(async () => await deleteFromTable());

  it("Return status 200 and 201 from categories routes", async () => {
    const sendCategory = await request(urlTest).post(`/category`).send({
      name: testCreate,
    });
    const getCategories = await request(urlTest).get("/categories");
    const getCategory = await request(urlTest).get(
      `/category/${sendCategory.body.id}`
    );
    const putCategory = await request(urlTest)
      .put(`/category/${getCategory.body.id}`)
      .send({
        available: false,
      });
    const deleteCategory = await request(urlTest).delete(
      `/category/${getCategory.body.id}`
    );

    expect(getCategories.status).toBe(200);
    expect(getCategory.status).toBe(200);
    expect(putCategory.status).toBe(200);
    expect(deleteCategory.status).toBe(200);
    expect(sendCategory.status).toBe(201);
  });
});
