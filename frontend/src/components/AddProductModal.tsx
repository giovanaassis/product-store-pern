import * as Dialog from "@radix-ui/react-dialog";
import {
  PlusCircleIcon,
  X,
  TagIcon,
  DollarSignIcon,
  ImageIcon,
} from "lucide-react";
import { useState } from "react";

function AddProductModal() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const isFormValid =
    name.trim() !== "" && price.trim() !== "" && image.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      console.log("Data: ", { name, price, image });
      setIsOpen(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="bg-[#23CE6B] text-primary-black font-bold p-3 rounded-full flex items-center gap-x-2 cursor-pointer">
        <PlusCircleIcon />
        Add Product
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-primary-black p-6 rounded-xl shadow-lg w-[90vw] max-w-md text-white"
          aria-describedby={undefined}
        >
          <div className="flex justify-between items-center mb-10">
            <Dialog.Title className="text-2xl font-bold">
              New Product
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-red-500">
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputContainer relative">
              <label htmlFor="name">Product Name</label>
              <TagIcon className="absolute w-5 h-5 top-11 left-2 opacity-50" />
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="input"
              />
            </div>

            <div className="inputContainer relative">
              <label htmlFor="price">Price</label>
              <DollarSignIcon className="absolute w-5 h-5 top-11 left-2 opacity-50" />
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min={1}
                className="input"
              />
            </div>

            <div className="inputContainer relative">
              <label htmlFor="image">Image URL</label>
              <ImageIcon className="absolute w-5 h-5 top-11 left-2 opacity-50" />
              <input
                type="text"
                name="image"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="input"
              />
            </div>

            <div className="flex justify-end mt-6">
              <Dialog.Close asChild>
                <button className="text-white px-4 py-2 rounded-full cursor-pointer">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="bg-[#23CE6B] text-primary-black font-bold p-3 rounded-full flex items-center gap-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
                disabled={!isFormValid}
              >
                Add Product
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddProductModal;
