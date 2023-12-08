import request from "supertest";
import { testCreate, deleteFromTable, urlTest } from "./testConfig";

describe("Orders test route", () => {
  afterAll(async () => await deleteFromTable());

  it("Return status 200 and 201 from orders routes", async () => {
    const getCategories = await request(urlTest).get("/categories");
    const sendClient = await request(urlTest).post(`/client`).send({
      name: testCreate,
      email: "",
      phone: "",
    });
    const sendProduct = await request(urlTest).post(`/product`).send({
      name: testCreate,
      price: 0,
      category_id: getCategories.body.data[0].id,
    });

    const sendMasterOrder = await request(urlTest).post(`/master-order`).send({
      date: testCreate,
      shipping: 0,
      client_id: sendClient.body.id,
    });
    const getMasterOrders = await request(urlTest).get(`/master-orders`);
    const getMasterOrder = await request(urlTest).get(
      `/master-order/${sendMasterOrder.body.id}`
    );
    const putMasterOrder = await request(urlTest)
      .put(`/master-order/${getMasterOrder.body.id}`)
      .send({ shipping: 1 });

    const sendOrder = await request(urlTest).post(`/order`).send({
      master_order_id: getMasterOrder.body.id,
      product_id: sendProduct.body.id,
      quantity: 1,
      price: 10,
    });
    const getOrder = await request(urlTest).get(`/order/${sendOrder.body.id}`);
    const putOrder = await request(urlTest)
      .put(`/order/${sendOrder.body.id}`)
      .send({
        price: 0,
      });
    const deleteOrder = await request(urlTest).delete(
      `/order/${sendOrder.body.id}`
    );
    
    const deleteMasterOrder = await request(urlTest).delete(
      `/master-order/${getMasterOrder.body.id}`
    );

    expect(sendMasterOrder.status).toBe(201);
    expect(getMasterOrders.status).toBe(200);
    expect(getMasterOrder.status).toBe(200);
    expect(putMasterOrder.status).toBe(200);
    expect(deleteMasterOrder.status).toBe(200);
    expect(sendOrder.status).toBe(201);
    expect(getOrder.status).toBe(200);
    expect(putOrder.status).toBe(200);
    expect(deleteOrder.status).toBe(200);
  });
});
