import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, X } from 'lucide-react';
import { Product } from '@shared/schema';

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    const total = getTotalPrice();
    const itemList = cartItems.map(item => 
      `${item.name} (Qty: ${item.quantity}) - ₦${(parseFloat(item.price) * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const message = `Hi! I'd like to order:\n\n${itemList}\n\nTotal: ₦${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`;
    const whatsappUrl = `https://wa.me/2348038507754?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setCartItems([]); // Clear cart after checkout
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-burgundy-600" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              {cartItems.length > 0 && (
                <span className="bg-burgundy-600 text-white text-xs rounded-full px-2 py-1">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              data-testid="button-close-cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-burgundy-600 font-semibold">
                        ₦{parseFloat(item.price).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 bg-white rounded text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-burgundy-600">₦{getTotalPrice().toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                data-testid="button-checkout"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Checkout via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the add to cart function to be used in other components
export const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    const savedCart = localStorage.getItem('cart');
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = currentCart.find(item => item.id === product.id);
    let newCart: CartItem[];
    
    if (existingItem) {
      newCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity }];
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return { addToCart, getTotalItems, cartItems };
};

export default ShoppingCart;