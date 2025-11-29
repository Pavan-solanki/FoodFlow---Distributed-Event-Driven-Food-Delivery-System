import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../redux/cartSlice';
import { Trash2, ArrowRight, CheckCircle, CreditCard, Loader2, ShoppingBag, XCircle, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  const [isOrdering, setIsOrdering] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [orderStatus, setOrderStatus] = useState(null); 
  const [orderId, setOrderId] = useState(null);
  
  // NEW: Wallet State
  const [walletBalance, setWalletBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const steps = [
    { id: 1, label: "Placing Order", icon: ShoppingBag },
    { id: 2, label: "Verifying Wallet", icon: CreditCard },
    { id: 3, label: "Confirmed", icon: CheckCircle },
  ];

  // 1. FETCH WALLET BALANCE ON LOAD
  useEffect(() => {
    axios.get("http://localhost:8080/payments/wallet")
      .then(response => {
        setWalletBalance(response.data);
        setLoadingBalance(false);
      })
      .catch(err => {
        console.error("Failed to fetch wallet", err);
        setLoadingBalance(false);
      });
  }, []);

  // 2. HANDLE CHECKOUT
  const handleCheckout = async () => {
    if (cart.items.length === 0) return;
    setIsOrdering(true);
    setCurrentStep(1); 
    setOrderStatus(null);
    
    const orderData = {
      items: cart.items.map(item => `${item.name} x${item.quantity}`).join(", "),
      price: cart.totalPrice
    };

    try {
      const response = await axios.post("http://localhost:8080/orders", orderData);
      const newOrder = response.data;
      setOrderId(newOrder.id);
      setCurrentStep(2);
      dispatch(clearCart()); 
      connectToWebSocket(newOrder.id);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status === 'DOWN') {
         alert("⚠️ System Alert: " + error.response.data.message);
      } else {
         alert("Failed to place order.");
      }
      setIsOrdering(false);
      setCurrentStep(0);
    }
  };

  // 3. WEBSOCKET LOGIC
  const connectToWebSocket = (id) => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/orders/${id}`, (message) => {
        const updatedOrder = JSON.parse(message.body);
        handleStatusUpdate(updatedOrder.status, stompClient);
      });
      axios.get(`http://localhost:8080/orders/${id}`)
        .then(response => handleStatusUpdate(response.data.status, stompClient));
    });
  };

  const handleStatusUpdate = (status, client) => {
    if (status === 'CONFIRMED') {
        setCurrentStep(3); 
        setOrderStatus('CONFIRMED');
        // Update local balance visual
        if (walletBalance !== null) setWalletBalance(prev => prev - cart.totalPrice);
        client.disconnect();
    } 
    else if (status === 'CANCELLED') {
        setOrderStatus('CANCELLED'); 
        setIsOrdering(false);
        client.disconnect();
    }
  };

  // --- RENDER SCENARIOS ---
  if (orderStatus === 'CANCELLED') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fadeIn">
        <div className="bg-red-100 p-6 rounded-full mb-6 animate-pulse"><XCircle size={64} className="text-red-600" /></div>
        <h2 className="text-4xl font-brand text-gray-800 mb-2">Transaction Failed</h2>
        <p className="text-gray-500 mb-8 text-lg">Your wallet balance (${walletBalance}) is insufficient.</p>
        <button onClick={() => window.location.reload()} className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition">Try Again</button>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fadeIn">
        <div className="bg-green-100 p-6 rounded-full mb-6 animate-bounce"><CheckCircle size={64} className="text-green-600" /></div>
        <h2 className="text-4xl font-brand text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8 text-lg">Order #{orderId} accepted. Remaining Balance: <b>${walletBalance?.toFixed(2)}</b></p>
        <Link to="/" className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition">Order More Food</Link>
      </div>
    );
  }

  if (cart.items.length === 0 && !isOrdering) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty" className="w-48 mb-6 opacity-50" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <Link to="/" className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      {isOrdering && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-8">Processing Transaction...</h2>
            <div className="relative flex justify-between px-4">
              <div className="absolute top-5 left-4 right-4 h-1 bg-gray-200 -z-10"></div>
              <div className="absolute top-5 left-4 h-1 bg-green-500 transition-all duration-500 -z-10" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
              {steps.map((step) => {
                const isActive = currentStep >= step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-green-500 text-white scale-110' : 'bg-gray-200 text-gray-400'}`}>
                      {currentStep === step.id && step.id !== 3 ? <Loader2 className="animate-spin" size={20}/> : <step.icon size={20} />}
                    </div>
                    <span className={`text-xs font-bold ${isActive ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-6 border-b last:border-0 hover:bg-gray-50 transition">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 text-sm font-medium flex items-center gap-1 mt-1 hover:underline"><Trash2 size={14} /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-96">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
            
            {/* NEW: WALLET BALANCE DISPLAY */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Wallet size={24}/></div>
                    <div>
                        <p className="text-xs text-blue-600 font-bold uppercase">Your Balance</p>
                        {loadingBalance ? <Loader2 className="animate-spin w-4 h-4"/> : <p className="text-xl font-bold text-blue-900">${walletBalance?.toFixed(2)}</p>}
                    </div>
                </div>
                {/* Visual Indicator if sufficient funds */}
                {!loadingBalance && walletBalance < (cart.totalPrice + 2) && (
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-1 rounded">Low Funds</span>
                )}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-6">Bill Details</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600"><span>Item Total</span><span>${cart.totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery Fee</span><span>$2.00</span></div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900"><span>TO PAY</span><span>${(cart.totalPrice + 2.00).toFixed(2)}</span></div>
            </div>

            <button 
                onClick={handleCheckout} 
                disabled={isOrdering || (!loadingBalance && walletBalance < (cart.totalPrice + 2))} 
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {walletBalance < (cart.totalPrice + 2) ? "Insufficient Balance" : <>Place Order <ArrowRight size={20} /></>}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;