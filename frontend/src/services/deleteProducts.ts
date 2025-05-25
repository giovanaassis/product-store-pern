import { api } from "../axios/config";

export const deleteProducts = async (id: number) => {
  try {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error at deleteProducts", error);
  }
};
