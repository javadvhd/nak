export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  attributes: ProductAttribute[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  attributes: Omit<ProductAttribute, "id">[];
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "stock" | "createdAt";
  sortOrder?: "asc" | "desc";
}
