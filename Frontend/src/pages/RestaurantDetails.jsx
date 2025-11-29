import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

// Mock Menu Data
const menuItems = [
  { id: 101, name: "Whopper Burger", price: 5.99, desc: "Flame-grilled beef patty with tomatoes & lettuce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", category: "Best Seller" },
  { id: 102, name: "Crispy Chicken Royale", price: 6.49, desc: "Crispy chicken breast with mayo.", image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=500&q=80", category: "Chicken" },
  { id: 103, name: "Cheesy Fries", price: 3.99, desc: "Golden fries topped with melted cheese.", image: "https://images.unsplash.com/photo-1585109649139-3668018951a7?w=500&q=80", category: "Sides" },
  { id: 104, name: "Chocolate Shake", price: 4.50, desc: "Thick and creamy chocolate milkshake.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80", category: "Drinks" },
];

const RestaurantDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Helper to get quantity of an item in cart
  const getItemQuantity = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Burger King</h1>
                <p className="text-gray-500 text-sm mb-4">American • Fast Food • Burgers</p>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                   <div className="flex items-center gap-1"><Star size={18} className="text-green-600 fill-green-600"/> <span className="font-bold text-gray-800">4.5</span> (1K+ ratings)</div>
                   <span>•</span>
                   <div className="flex items-center gap-1"><Clock size={18} /> 30-35 mins</div>
                   <span>•</span>
                   <div className="flex items-center gap-1"><MapPin size={18} /> 2.5 km away</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white text-center shadow-sm">
                 <p className="text-green-600 font-bold text-lg">OFFER</p>
                 <p className="text-gray-500 text-xs mt-1">50% off up to $5</p>
              </div>
           </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
         <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Recommended</h2>
         
         <div className="space-y-6">
            {menuItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between gap-4 hover:shadow-md transition">
                 {/* Left: Info */}
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <img src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" className="w-4 h-4" alt="type"/>
                       <span className="text-yellow-600 font-bold text-xs uppercase">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-900 font-medium mt-1">${item.price}</p>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{item.desc}</p>
                 </div>

                 {/* Right: Image & Add Button */}
                 <div className="relative w-32 h-32 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg border border-gray-200 flex items-center overflow-hidden w-24">
                       {getItemQuantity(item.id) === 0 ? (
                         <button 
                           onClick={() => dispatch(addToCart(item))}
                           className="w-full py-2 text-green-600 font-bold text-sm uppercase hover:bg-green-50"
                         >
                           ADD
                         </button>
                       ) : (
                         <div className="flex items-center justify-between w-full px-2 py-1">
                            <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-500 hover:text-red-500"><Minus size={14} /></button>
                            <span className="text-green-700 font-bold text-sm">{getItemQuantity(item.id)}</span>
                            <button onClick={() => dispatch(addToCart(item))} className="text-green-600 hover:text-green-800"><Plus size={14} /></button>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;