export interface ICreateOrder {
  body: {
    quantity?: number;
    price?: number;
    master_order_id?: any;
    product_id?: any;
  };
}

export interface IChangeOrder {
  body: {
    quantity?: number;
    price?: number;
    master_order_id?: any;
    product_id?: any;
  };
  id: string;
}

export interface IGetOrder {
  id: string;
}
