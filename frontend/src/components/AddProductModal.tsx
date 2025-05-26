import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircleIcon, X } from "lucide-react";

function AddProductModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-[#23CE6B] text-primary-black font-bold p-3 rounded-full flex items-center gap-x-2 cursor-pointer">
        <PlusCircleIcon />
        Add Product
    </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-primary-black p-6 rounded-xl shadow-lg w-[90vw] max-w-md text-white"
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              New Product
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-red-500">
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </Dialog.Close>
          </div>

          <p>Conteúdo do modal aqui.</p>

          <div className="flex justify-end mt-6">
            <Dialog.Close asChild>
              <button className="text-white px-4 py-2 rounded-full cursor-pointer">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="bg-[#23CE6B] text-primary-black font-bold p-3 rounded-full flex items-center gap-x-2 cursor-pointer">
                Add Product
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddProductModal;
