import type { ProductType } from "@/@types/product";
import { api } from "@/axios/config";

export const updateProducts = async (product: ProductType) => {
  try {
    const response = await api.put(`/api/products/${product.id}`, product);

    return response.data;
  } catch (error) {
    console.log("Error at updateProducts: ", error);
  }
};
