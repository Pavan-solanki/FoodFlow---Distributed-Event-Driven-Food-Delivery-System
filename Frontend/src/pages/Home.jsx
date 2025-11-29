import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data (We will replace this with real API data later)
const restaurants = [
  { id: 1, name: "Burger King", rating: 4.5, time: "25-30 min", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80", tags: "Burgers, American" },
  { id: 2, name: "Pizza Hut", rating: 4.2, time: "30-40 min", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", tags: "Italian, Pizza" },
  { id: 3, name: "Sushi Master", rating: 4.8, time: "45-55 min", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", tags: "Japanese, Sushi" },
  { id: 4, name: "Taco Bell", rating: 4.0, time: "20-25 min", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80", tags: "Mexican, Tacos" },
];

const Home = () => {
  return (
    <div className="pb-20">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-[300px] flex items-center justify-center text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-brand mb-4 drop-shadow-md">Delicious Food, Delivered</h1>
          <p className="text-xl opacity-90 font-light">Order from your favorite restaurants in seconds.</p>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-wrap gap-4 justify-center md:justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">42 Restaurants nearby</h2>
          <div className="flex gap-3">
             {['Fast Delivery', 'Rating 4.0+', 'Pure Veg', 'Offers'].map(filter => (
               <button key={filter} className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition">
                 {filter}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* RESTAURANT GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {restaurants.map((res) => (
          <Link to={`/restaurant/${res.id}`} key={res.id} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img src={res.img} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-bold shadow-md">
                   50% OFF up to $10
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold text-gray-800">{res.name}</h3>
                  <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    {res.rating} <Star size={10} fill="white" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm truncate">{res.tags}</p>
                <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs font-medium uppercase tracking-wide border-t pt-3">
                   <span className="flex items-center gap-1"><Clock size={14} /> {res.time}</span>
                   <span>•</span>
                   <span>$2.00 Delivery</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;