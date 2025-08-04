import {
  createProductApi,
  deleteProductApi,
  getProductApi,
  getProductsApi,
  updateProductApi,
} from "./product.api";
import {
  CreateProductPayload,
  Product,
  ProductFilters,
  ProductsResponse,
  UpdateProductPayload,
} from "./product.types";

export const getProducts = async (
  filters?: ProductFilters
): Promise<ProductsResponse> => {
  try {
    return await getProductsApi(filters);
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    return await getProductApi(id);
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  try {
    return await createProductApi(payload);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  try {
    return await updateProductApi(id, payload);
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await deleteProductApi(id);
  } catch (error) {
    throw error;
  }
};
