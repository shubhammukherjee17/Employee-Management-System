'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthState, User } from '../types';
import { auth, googleProvider } from '../../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut } from 'firebase/auth';

interface AuthContextType extends AuthState {
    login: (email: string, password?: string) => Promise<void>;
    signup: (email: string, password?: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Map Firebase user to our User type
                const mappedUser: User = {
                    id: currentUser.uid,
                    name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
                    email: currentUser.email || '',
                    role: 'admin' // Defaulting to admin
                };
                setUser(mappedUser);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        });

        // Handle redirect result
        getRedirectResult(auth).then((result) => {
            if (result) {
                // User is signed in.
                // The onAuthStateChanged listener will handle state updates, 
                // but we can do specific post-login logic here if needed.
                console.log("Redirect login successful", result.user);
            }
        }).catch((error) => {
            console.error("Redirect login failed", error);
            alert("Login Failed: " + error.message);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password?: string) => {
        if (!password) {
            alert("Password is required");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (error: any) {
            console.error("Login failed", error);
            alert("Login Failed: " + error.message);
        }
    };

    const signup = async (email: string, password?: string) => {
        if (!password) {
            alert("Password is required");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (error: any) {
            console.error("Signup failed", error);
            alert("Signup Failed: " + error.message);
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithRedirect(auth, googleProvider);
            // No need to redirect here as signInWithRedirect will trigger a page reload/redirect
        } catch (error: any) {
            console.error("Google Login failed", error);
            alert("Google Login Failed: " + error.message);
        }
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
