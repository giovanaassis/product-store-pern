import type { ProductType } from "@/@types/product";
import { ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavBarProps {
  products: ProductType[];
}

const Navbar = ({ products }: NavBarProps) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const badgeStyles = `absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full`;

  console.log(products.length);

  return (
    <div className="bg-secondary-black flex items-center justify-around py-6">
      {/* LOGO */}
      <Link to={"/"}>
        <div className="flex text-blue cursor-pointer items-center gap-x-3 text-2xl">
          <ShoppingCartIcon size={50} />
          <span>PRODUCT STORE</span>
        </div>
      </Link>

      {/* RIGHT SECTION */}
      {isHomePage && (
        <div className="cursor-pointer relative">
          <span className={`${badgeStyles}`}>{products.length}</span>
          <ShoppingBagIcon size={25} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
