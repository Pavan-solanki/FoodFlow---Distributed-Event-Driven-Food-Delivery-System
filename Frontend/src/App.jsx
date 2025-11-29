import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Navbar from './components/Navbar';

// PAGES (Make sure these imports point to your real files)
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <Routes>
          {/* 1. The Home Page (Restaurant Grid) */}
          <Route path="/" element={<Home />} />

          {/* 2. The Menu Page (Dynamic ID) */}
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />

          {/* 3. The Checkout Page */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;