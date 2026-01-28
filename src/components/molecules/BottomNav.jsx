import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const BottomNav = () => {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50">
      <div className="flex justify-around items-center h-14">
        <NavLink to="/" className="flex flex-col items-center text-xs">
          <HomeIcon className="w-6 h-6" />
          Home
        </NavLink>

        <NavLink to="/shop/product-list" className="flex flex-col items-center text-xs">
          <ShoppingBagIcon className="w-6 h-6" />
          Shop
        </NavLink>

        {/* CART (MOBILE ONLY) */}
        <NavLink to="/shop/cart" className="relative flex flex-col items-center text-xs">
          <ShoppingCartIcon className="w-6 h-6" />
          Cart

          {totalQuantity > 0 && (
            <span className="absolute -top-1 right-2 bg-red-600 text-white text-[10px] rounded-full px-1">
              {totalQuantity}
            </span>
          )}
        </NavLink>

        <NavLink to="/profile-settings" className="flex flex-col items-center text-xs">
          <UserIcon className="w-6 h-6" />
          Akun
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
