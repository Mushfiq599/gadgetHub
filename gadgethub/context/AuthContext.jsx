"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// ── Hardcoded admin emails ──────────────────────────────────────────
// Add your own email here to get admin access
const ADMIN_EMAILS = [
    "admin@gadgethub.com",
    "demo.admin@gadgethub.com",
];

// ── Demo credentials (shown on login page) ──────────────────────────
export const DEMO_CREDENTIALS = {
    admin: {
        email: "demo.admin@gadgethub.com",
        password: "admin123",
        label: "Demo Admin",
    },
    user: {
        email: "demo.user@gadgethub.com",
        password: "user1234",
        label: "Demo User",
    },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // "admin" | "user" | null
    const [loading, setLoading] = useState(true);

    // Derive role from email
    const deriveRole = (firebaseUser) => {
        if (!firebaseUser) return null;
        return ADMIN_EMAILS.includes(firebaseUser.email) ? "admin" : "user";
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setRole(deriveRole(firebaseUser));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setRole(deriveRole(result.user));
    };

    const register = async (name, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        const updatedUser = { ...result.user, displayName: name };
        setUser(updatedUser);
        setRole(deriveRole(updatedUser));
    };

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        setRole(deriveRole(result.user));
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, role, loading, login, register, loginWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}

export function useIsAdmin() {
    const { role } = useAuth();
    return role === "admin";
}

export function useIsUser() {
    const { role } = useAuth();
    return role === "user";
}