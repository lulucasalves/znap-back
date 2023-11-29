export interface IGetClients {
  limit: string;
  page: string;
  order: string;
  sort: string;
}

export interface ICreateClient {
  body: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface IChangeClient {
  body: {
    name: string;
    email: string;
    phone: string;
  };
  id: string;
}

export interface IGetClient {
  id: string;
}
