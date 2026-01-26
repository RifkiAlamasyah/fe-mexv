import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50">
      <div className="flex justify-around items-center h-14">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <HomeIcon className="w-6 h-6" />
          Home
        </NavLink>

        <NavLink
          to="/shop/product-list"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <ShoppingBagIcon className="w-6 h-6" />
          Shop
        </NavLink>

        {/* <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
          Chat
        </NavLink> */}

        <NavLink
          to="/profile-settings"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <UserIcon className="w-6 h-6" />
          Akun
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
