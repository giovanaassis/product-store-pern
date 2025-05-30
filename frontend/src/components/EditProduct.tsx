import type { ProductType } from "@/@types/product";
import { useState } from "react";
import { Trash2Icon, SaveIcon } from "lucide-react";
import { updateProducts } from "@/services/updateProducts";
import { useNavigate } from "react-router-dom";
import { deleteProducts } from "@/services/deleteProducts";

function EditProduct({ id, name, price, image }: ProductType) {
  const navigate = useNavigate();

  const [currentProduct, setCurrentProduct] = useState<ProductType>({
    id: id,
    name: name,
    image: image,
    price: price,
  });

  const buttonStyles = `p-3 rounded-full cursor-pointer hover:opacity-70 flex gap-x-2 items-center justify-center`;

  const isFormValid =
    currentProduct.name.trim() !== "" &&
    currentProduct.price.trim() !== "" &&
    currentProduct.image.trim() !== "";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      updateProducts(currentProduct);
      navigate("/");
    } else {
      alert("Invalid input!");
    }
  };

  const handleDelete = () => {
    deleteProducts(currentProduct.id);
    navigate("/");
  };

  return (
    <div className="bg-secondary-black rounded-xl w-full p-5 shadow-white lg:w-[45%] lg:h-[500px]">
      <h1 className="text-3xl mb-10">Edit Product</h1>
      <form onSubmit={handleSave}>
        {/* INPUT PRODUCT NAME */}
        <div className="inputContainer relative mb-6">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={currentProduct.name}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, name: e.target.value })
            }
            placeholder="Enter product name"
            className="input pl-4"
          />
        </div>

        {/* INPUT PRICE */}
        <div className="inputContainer relative mb-6">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={currentProduct.price}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: e.target.value })
            }
            placeholder="0.00"
            min={1}
            className="input pl-4"
          />
        </div>

        {/* INPUT IMAGE URL */}
        <div className="inputContainer relative mb-6">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            id="image"
            value={currentProduct.image}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, image: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
            className="input pl-4"
          />
        </div>

        <div className="flex flex-col gap-y-5 lg:gap-x-5 text-black justify-center pt-5 lg:flex-row">
          <button
            className={`${buttonStyles} bg-red-400`}
            onClick={handleDelete}
            type="button"
          >
            <Trash2Icon size={20} />
            Delete Product
          </button>

          <button
            className={`${buttonStyles} bg-green-500`}
            onClick={handleSave}
            type="submit"
          >
            <SaveIcon size={20} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
