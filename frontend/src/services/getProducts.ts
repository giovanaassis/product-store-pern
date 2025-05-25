import { api } from "../axios/config";

export const getProducts = async () => {
  try {
    const response = await api.get("/api/products");

    return response.data;
  } catch (error) {
    console.log("Error at getProducts", error);
  }
};
