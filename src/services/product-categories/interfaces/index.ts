export interface IGetProductCategories {
  limit: string;
  page: string;
  order: string;
  sort: string;
}

export interface ICreateProductCategory {
  body: {
    name?: string;
    available?: boolean;
  };
}

export interface IChangeProductCategory {
  body: {
    name?: string;
    available?: boolean;
  };
  id: string;
}

export interface IGetProductCategory {
  id: string;
}
