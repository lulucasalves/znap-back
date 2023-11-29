export interface IGetProducts {
  limit: string;
  page: string;
  order: string;
  sort: string;
  categories: string;
}

export interface ICreateProduct {
  body: {
    name?: string;
    price?: number;
    category_id?: any;
  };
}

export interface IChangeProduct {
  body: {
    name?: string;
    price?: number;
    category_id?: any;
  };
  id: string;
}

export interface IGetProduct {
  id: string;
}
