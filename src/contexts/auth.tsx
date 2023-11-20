import axios, { AxiosInstance } from 'axios';
import 'react';
import React, { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from '../global/API_BASE_URL';

interface User{
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}

export interface AuthContextProps {
    user: User | null;
    getApi: () => AxiosInstance | null;
    login: (email: string, password: string, accessToken: string, refreshToken: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    getApi: () => null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string, accessToken: string, refreshToken: string) => {
        setUser({email: email, password: password, accessToken: accessToken, refreshToken: refreshToken})
        localStorage.setItem("user", JSON.stringify({
            email: email,
            password: password,
            accessToken: accessToken,
            refreshToken: refreshToken
        }));
    }

    const getApi = () => {
        if (!user) {
          return null;
        }
    
        return axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
    };

    useEffect(() => {
        try {
            const userSaved = localStorage.getItem("user");
            if (userSaved && user === null) {
                const parsedUser = JSON.parse(userSaved);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Erro ao analisar o usuário salvo:", error);
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.setItem("user", "");
        return;
    }

    return (
        <AuthContext.Provider
            value={{ user, getApi, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};