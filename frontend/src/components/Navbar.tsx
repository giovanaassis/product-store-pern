import { ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const badgeStyles = `absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full`;

  return (
    <div className="bg-secondary-black flex items-center justify-around py-6">
      {/* LOGO */}
      <div className="flex text-blue cursor-pointer items-center gap-x-3">
        <ShoppingCartIcon size={50} />
        <span>PRODUCT STORE</span>
      </div>

      {/* RIGHT SECTION */}
      {isHomePage && (
        <div className="cursor-pointer relative">
          <span className={`${badgeStyles}`}>8</span>
          <ShoppingBagIcon size={25} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
