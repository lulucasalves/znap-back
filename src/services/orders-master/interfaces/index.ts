export interface IGetOrdersMaster {
  limit: string;
  page: string;
  order: string;
  sort: "DESC" | "ASC";
  categories: string;
  clients: string;
  products: string;
  dateFrom: string;
  dateTo: string;
}

export interface ICreateOrderMaster {
  body: {
    shipping: string;
    client_id: any;
    date: string;
   
  };
}

export interface IChangeOrderMaster {
  body: {
    shipping: string;
    client_id: any;
    date: string;
  
  };
  id: string;
}

export interface IGetOrderMaster {
  id: string;
}
