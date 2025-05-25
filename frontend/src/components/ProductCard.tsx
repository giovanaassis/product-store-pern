import { EditIcon, Trash2 } from "lucide-react";
import type { ProductType } from "../@types/product";
import { Link } from "react-router-dom";

type ProductCardProps = ProductType & {
  onDelete: () => void;
};

function ProductCard({ image, name, price, id, onDelete }: ProductCardProps) {
  return (
    <div className="productCard">
      {/* IMAGE PRODUCT */}
      <img
        src={image}
        alt={`product-${name}-${id}`}
        className="w-[340px] h-[230px] object-fill rounded-t-2xl"
      />

      {/* CONTENT PRODUCT */}
      <div className="p-5">
        {/* DESCRIPTION */}
        <p>{name}</p>
        <p className="text-green-400 font-bold my-3">${price}</p>

        {/* ACTIONS ICONS */}
        <div className="flex justify-end gap-x-5">
          <Link to={"/product"}>
            <EditIcon className="text-blue cursor-pointer md:hover:opacity-60" />
          </Link>
          <Trash2
            className="text-red-500 cursor-pointer md:hover:opacity-60"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
