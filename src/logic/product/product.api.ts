import { axiosInstance } from "../../api/axiosInstance";
import {
  CreateProductPayload,
  Product,
  ProductFilters,
  ProductsResponse,
  UpdateProductPayload,
} from "./product.types";

export const getProductsApi = async (
  filters?: ProductFilters
): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ProductsResponse>("/products", {
    params: filters,
  });
  return response.data;
};

export const getProductApi = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProductApi = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const response = await axiosInstance.post<Product>("/products", payload);
  return response.data;
};

export const updateProductApi = async (
  id: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  const response = await axiosInstance.put<Product>(`/products/${id}`, payload);
  return response.data;
};

export const deleteProductApi = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};
