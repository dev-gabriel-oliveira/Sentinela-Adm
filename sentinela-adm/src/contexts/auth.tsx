import 'react';
import React, { createContext, useState, useEffect } from "react";

interface User{
    email: string;
    password: string;
}

export interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        setUser({email: email, password: password})
        localStorage.setItem("user", JSON.stringify({email: email, password: password}));
    }

    useEffect(() => {
        try {
            const userSaved = localStorage.getItem("user");
            if (userSaved && user === null) {
                setUser(JSON.parse(userSaved));
            }
        } catch (error) {
            console.error("Erro ao analisar o usuário salvo:", error);
        }
    });

    const logout = () => {
        console.log("teste");
        
        setUser(null);
        localStorage.setItem("user", "");
        return;
    }

    return (
        <AuthContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};