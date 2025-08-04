import { axiosInstance } from "../../api/axiosInstance";
import {
  Attribute,
  AttributeFilters,
  AttributesResponse,
  CreateAttributePayload,
  UpdateAttributePayload,
} from "./attribute.types";

export const getAttributesApi = async (): Promise<AttributesResponse> => {
  const response = await axiosInstance.get<AttributesResponse>("/attributes");
  return response.data;
};

export const getAttributeApi = async (id: string): Promise<Attribute> => {
  const response = await axiosInstance.get<Attribute>(`/attributes/${id}`);
  return response.data;
};

export const createAttributeApi = async (
  payload: CreateAttributePayload
): Promise<Attribute> => {
  const response = await axiosInstance.post<Attribute>("/attributes", payload);
  return response.data;
};

export const updateAttributeApi = async (
  id: string,
  payload: UpdateAttributePayload
): Promise<Attribute> => {
  const response = await axiosInstance.put<Attribute>(
    `/attributes/${id}`,
    payload
  );
  return response.data;
};

export const deleteAttributeApi = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/attributes/${id}`);
};
