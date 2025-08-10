import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient, AuthUser } from "../services/authClient";

type AuthState = {
    user: AuthUser | null;
    ready: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const Ctx = createContext<AuthState>(null as any);
export const useAuth = () => useContext(Ctx);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const u = await authClient.me();
            setUser(u);
            setReady(true);
        })();
    }, []);

    const login = async (email: string, password: string) => {
        const { user } = await authClient.login(email, password);
        setUser(user);
    };

    const register = async (email: string, password: string) => {
        await authClient.register(email, password);
        await login(email, password);
    };

    const logout = async () => {
        await authClient.logout();
        setUser(null);
    };

    return <Ctx.Provider value={{ user, ready, login, register, logout }}>{children}</Ctx.Provider>;
};
