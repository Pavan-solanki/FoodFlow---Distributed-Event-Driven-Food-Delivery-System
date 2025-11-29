import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
const Navbar = () => {  // NO PROPS NEEDED
  
  // Connect to the "Brain"
  const cartQuantity = useSelector(state => state.cart.totalQuantity);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* LEFT: Logo & Location */}
        <div className="flex items-center gap-8">
          {/* THE BRAND LOGO */}
          <Link to="/" className="text-4xl font-brand text-red-500 tracking-wide hover:scale-105 transition-transform">
            FoodFlow
          </Link>

          {/* Location Selector (Like Swiggy) */}
          <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">
            <MapPin size={18} />
            <span className="font-bold text-gray-800">Noida,</span> India
          </div>
        </div>

        {/* CENTER: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for restaurants, cuisine or a dish..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-red-100 outline-none transition shadow-inner"
          />
        </div>

        {/* RIGHT: Menu Links */}
        <div className="flex items-center gap-8">
          <Link to="/offers" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-red-500 font-medium transition">
             Offers
          </Link>
          
          <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-red-500 font-medium transition">
            <User size={22} />
            <span className="hidden md:block">Sign In</span>
          </Link>

          {/* CART BUTTON */}
          <Link to="/cart" className="relative flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition shadow-lg shadow-red-200">
            <ShoppingBag size={20} />
            <span className="font-bold">Cart</span>
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-1 bg-yellow-400 text-red-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                {cartQuantity}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;