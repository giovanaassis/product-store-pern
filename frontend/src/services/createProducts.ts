import { api } from "@/axios/config";

export const createProducts = async (product: object) => {
    try {
        const response = await api.post("/api/products", product)
        return response.data;
        
    } catch (error) {
        console.log("Error at createProducts", error);
    }
}