import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch product and cart data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backend_url}/allproducts`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    const fetchCart = async () => {
      if (localStorage.getItem("auth-token")) {
        try {
          const res = await fetch(`${backend_url}/getcart`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({}),
          });
          const data = await res.json();
          setCartItems(data);
        } catch (err) {
          console.error("Failed to fetch cart", err);
        }
      } else {
        initializeEmptyCart();
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  // Initialize empty cart for unauthenticated users
  const initializeEmptyCart = () => {
    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    setCartItems(cart);
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = products.find((p) => p.id === Number(itemId));
      return item ? total + cartItems[itemId] * item.new_price : total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = products.find((p) => p.id === Number(itemId));
      return item ? total + cartItems[itemId] : total;
    }, 0);
  };

  const updateCartOnServer = async (endpoint, itemId) => {
    try {
      await fetch(`${backend_url}/${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId }),
      });
    } catch (err) {
      console.error(`Failed to ${endpoint} for itemId ${itemId}`, err);
    }
  };

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      return alert("Please log in to add items to your cart.");
    }
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    updateCartOnServer("addtocart", itemId);
  };

  const removeFromCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) return;
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }));
    updateCartOnServer("removefromcart", itemId);
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;