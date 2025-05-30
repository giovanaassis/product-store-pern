/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
import { api } from "@/axios/config";
import { useEffect, useState } from "react";
import type { ProductType } from "@/@types/product";
import EditProduct from "@/components/EditProduct";

function Product() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<ProductType>();

  const fetchProduct = async () => {
    try {
      const product = await api.get(`/api/products/${id}`);
      setCurrentProduct(product.data);
    } catch (error) {
      console.log("Error at fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <Navbar />

      {!currentProduct ? (
        <p className="text-2xl text-center mt-10">Loading...</p>
      ) : (
        <section className="flex items-center justify-center mx-auto w-[80%] md:w-[980px] py-10 flex-col gap-y-5">
          <Link
            to={"/"}
            className="flex gap-x-5 hover:bg-secondary-black rounded-4xl p-2 lg:ml-10 transition duration-200 self-start"
          >
            <ArrowLeft />
            <p>Back To Products</p>
          </Link>

          {/* EDIT PRODUCT SECTION */}
          <div className="w-full flex flex-col gap-y-5 lg:flex-row lg:justify-center gap-x-5">
            <div className="w-full lg:w-[45%] h-[500px] flex items-center justify-center flex-col shadow-white">
              <img
                src={currentProduct?.image}
                alt={`${currentProduct?.name}`}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>

            <EditProduct
              id={currentProduct.id}
              name={currentProduct.name}
              image={currentProduct.image}
              price={currentProduct.price}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default Product;
