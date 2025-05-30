import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProducts } from "../services/getProducts";
import { RefreshCwIcon, LoaderCircleIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import type { ProductType } from "../@types/product";
import { deleteProducts } from "../services/deleteProducts";
import toast from "react-hot-toast";
import AddProductModal from "@/components/AddProductModal";

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log("Error at fetchData at Home", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProducts(id);
      fetchData();
      toast("Product deleted sucessfully.", {
        duration: 2000,
        style: {
          color: "#fb2c36",
        },
      });
    } catch (error) {
      console.log("Error at handleDelete at Home", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar products={products}/>

      <main className="flex items-center justify-center flex-col w-[70%] mx-auto pb-10 md:w-[70%] lg:w-[1200px]">
        <div className="flex items-center justify-between w-full py-10 lg:px-8">
          <div>
            <AddProductModal onProductAdded={fetchData}/>
          </div>
          <RefreshCwIcon className="cursor-pointer" onClick={fetchData} />
        </div>

        {/* PRODUCTS SECTION */}
        {!isLoading && products.length === 0 && (
          <p className="text-xl">No products found. 😔</p>
        )}

        {isLoading ? (
          <LoaderCircleIcon className="spinner" />
        ) : (
          <section className="flex gap-15 flex-col justify-center md:flex-wrap lg:flex-row lg:flex-wrap">
            {products.map((product) => (
              <ProductCard
                name={product.name}
                image={product.image}
                price={product.price}
                id={product.id}
                key={product.id}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
