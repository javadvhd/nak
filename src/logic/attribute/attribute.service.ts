import {
  createAttributeApi,
  deleteAttributeApi,
  getAttributeApi,
  getAttributesApi,
  updateAttributeApi,
} from "./attribute.api";
import {
  Attribute,
  AttributeFilters,
  AttributesResponse,
  CreateAttributePayload,
  UpdateAttributePayload,
} from "./attribute.types";

export const getAttributes = async (
  filters?: AttributeFilters
): Promise<AttributesResponse> => {
  try {
    return await getAttributesApi(filters);
  } catch (error) {
    throw error;
  }
};

export const getAttribute = async (id: string): Promise<Attribute> => {
  try {
    return await getAttributeApi(id);
  } catch (error) {
    throw error;
  }
};

export const createAttribute = async (
  payload: CreateAttributePayload
): Promise<Attribute> => {
  try {
    return await createAttributeApi(payload);
  } catch (error) {
    throw error;
  }
};

export const updateAttribute = async (
  id: string,
  payload: UpdateAttributePayload
): Promise<Attribute> => {
  try {
    return await updateAttributeApi(id, payload);
  } catch (error) {
    throw error;
  }
};

export const deleteAttribute = async (id: string): Promise<void> => {
  try {
    await deleteAttributeApi(id);
  } catch (error) {
    throw error;
  }
};
