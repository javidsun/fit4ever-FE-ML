import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { authMock } from "@/src/mocks/authMock";

export type AuthUser = { id: string; email: string };
export type Tokens = { accessToken: string; refreshToken: string };

const ACCESS_KEY = "auth_access";
const REFRESH_KEY = "auth_refresh";

const storage = {
    // usa SecureStore se disponibile (iOS/Android), fallback ad AsyncStorage (web)
    async set(key: string, value: string) {
        try { await SecureStore.setItemAsync(key, value); }
        catch { await AsyncStorage.setItem(key, value); }
    },
    async get(key: string) {
        try { return await SecureStore.getItemAsync(key); }
        catch { return await AsyncStorage.getItem(key); }
    },
    async del(key: string) {
        try { await SecureStore.deleteItemAsync(key); }
        catch { await AsyncStorage.removeItem(key); }
    }
};

export const authClient = {
    async register(email: string, password: string) {
        return authMock.register(email, password);
    },

    async login(email: string, password: string): Promise<{ user: AuthUser; tokens: Tokens }> {
        const { accessToken, refreshToken, user } = await authMock.login(email, password);
        await storage.set(ACCESS_KEY, accessToken);
        await storage.set(REFRESH_KEY, refreshToken);
        return { user, tokens: { accessToken, refreshToken } };
    },

    async me(): Promise<AuthUser | null> {
        const access = await storage.get(ACCESS_KEY);
        try {
            const u = await authMock.me(access);
            return u;
        } catch {
            return null;
        }
    },

    async logout() {
        await storage.del(ACCESS_KEY);
        await storage.del(REFRESH_KEY);
    }
};
