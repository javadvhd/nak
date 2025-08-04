export interface Attribute {
  id: string;
  name: string;
  type: AttributeType;
  values: string[];
  createdAt: string;
  updatedAt: string;
}

export type AttributeType = "text" | "number" | "select" | "boolean";

export interface CreateAttributePayload {
  name: string;
  type: AttributeType;
  values: string[];
}

export interface UpdateAttributePayload
  extends Partial<CreateAttributePayload> {
  id: string;
}

export interface AttributesResponse {
  data: Attribute[];
  total: number;
  page: number;
  limit: number;
}

export interface AttributeFilters {
  search?: string;
  page?: number;
  limit?: number;
  type?: AttributeType;
  sortBy?: "name" | "type" | "createdAt";
  sortOrder?: "asc" | "desc";
}
