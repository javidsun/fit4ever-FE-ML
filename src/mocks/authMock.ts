//oggi mock domani API
// Semplice DB in-memory per mock
// NOTA: password salvata in chiaro perché è un MOCK lato client.

type User = { id: string; email: string; password: string; createdAt: string };

const db: Record<string, User> = {}; // email -> user

function uid() { return Math.random().toString(36).slice(2) + Date.now(); }

export const authMock = {
    async register(email: string, password: string) {
        const key = email.toLowerCase().trim();
        if (db[key]) throw new Error("Email già registrata");
        const user: User = { id: uid(), email: key, password, createdAt: new Date().toISOString() };
        db[key] = user;
        return { id: user.id, email: user.email, createdAt: user.createdAt };
    },

    async login(email: string, password: string) {
        const key = email.toLowerCase().trim();
        const u = db[key];
        if (!u || u.password !== password) throw new Error("Credenziali non valide");
        const access = "mock_access_" + uid();
        const refresh = "mock_refresh_" + uid();
        return { accessToken: access, refreshToken: refresh, user: { id: u.id, email: u.email } };
    },

    async me(accessToken: string | null) {
        if (!accessToken || !accessToken.startsWith("mock_access_")) throw new Error("Token non valido");
        const first = Object.values(db)[0];
        if (!first) throw new Error("Nessun utente");
        return { id: first.id, email: first.email };
    }
};
