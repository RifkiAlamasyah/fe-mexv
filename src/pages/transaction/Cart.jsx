import React, { useState } from "react";
import { Link } from "react-router-dom";
import Template from "../../components/Template";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

const Cart = () => {
  // Data cart dengan state untuk quantity
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Headphone",
      price: 199,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 249,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      quantity: 2,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 129,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      quantity: 1,
    },
  ]);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <Template>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center"
                >
                  {/* Product Info with Image */}
                  <div className="md:col-span-6 flex items-center space-x-4">
                    <img
                      src={`${item.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 flex items-center mt-1 text-sm"
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <span className="md:hidden font-semibold mr-2">Price:</span>
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity Control */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 text-right">
                    <span className="md:hidden font-semibold mr-2">Total:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6 md:w-1/3 ml-auto">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link to="/products" className="text-blue-600 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Template>
  );
};

export default Cart;