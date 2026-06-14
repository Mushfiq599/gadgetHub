"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext(null);

const CART_KEY = "gadgethub_cart";

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage when user changes
    useEffect(() => {
        if (!user) {
            setCartItems([]);
            return;
        }
        const key = `${CART_KEY}_${user.uid}`;
        const stored = JSON.parse(localStorage.getItem(key) || "[]");
        setCartItems(stored);
    }, [user]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!user) return;
        const key = `${CART_KEY}_${user.uid}`;
        localStorage.setItem(key, JSON.stringify(cartItems));
    }, [cartItems, user]);

    // Add item to cart
    const addToCart = useCallback(
        (gadget, quantity = 1) => {
            if (!user) {
                toast.error("Please login to add items to cart");
                return;
            }
            setCartItems((prev) => {
                const existing = prev.find((item) => item.id === gadget.id);
                if (existing) {
                    toast.success(`${gadget.title} quantity updated`);
                    return prev.map((item) =>
                        item.id === gadget.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                toast.success(`${gadget.title} added to cart`);
                return [
                    ...prev,
                    {
                        id: gadget.id,
                        title: gadget.title,
                        price: gadget.price,
                        imageUrl: gadget.imageUrl,
                        category: gadget.category,
                        brand: gadget.brand,
                        quantity,
                    },
                ];
            });
        },
        [user]
    );

    // Remove item from cart
    const removeFromCart = useCallback((gadgetId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== gadgetId));
        toast.success("Item removed from cart");
    }, []);

    // Update quantity
    const updateQuantity = useCallback((gadgetId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === gadgetId ? { ...item, quantity } : item
            )
        );
    }, []);

    // Clear entire cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Derived values
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}