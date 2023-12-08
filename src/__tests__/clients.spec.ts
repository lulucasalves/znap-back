import request from "supertest";
import { testCreate, deleteFromTable, urlTest } from "./testConfig";

describe("Clients test route", () => {
  afterAll(async () => await deleteFromTable());

  it("Return status 200 and 201 from clients routes", async () => {
    const sendClient = await request(urlTest).post(`/client`).send({
      name: testCreate,
      email: "",
      phone: "",
    });
    const getClients = await request(urlTest).get("/clients");
    const getClient = await request(urlTest).get(
      `/client/${sendClient.body.id}`
    );
    const putClient = await request(urlTest)
      .put(`/client/${getClient.body.id}`)
      .send({
        email: "test@test.com",
      });
    const deleteClient = await request(urlTest).delete(
      `/client/${getClient.body.id}`
    );

    expect(getClients.status).toBe(200);
    expect(getClient.status).toBe(200);
    expect(putClient.status).toBe(200);
    expect(deleteClient.status).toBe(200);
    expect(sendClient.status).toBe(201);
  });
});
