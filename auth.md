Gestione form e validazione

```bash
    npm i formik yup
```

Storage locale per i token mock
per moc va bene AsyncStorage

```bash
    npx expo install @react-native-async-storage/async-storage
```

(Per produzione, più sicuro) SecureStore:

```bash
    npx expo install expo-secure-store
```

(Facile switch a backend vero) client HTTP

```bash
    npm i axios
```

(Opzionale ma utile con Router) Native Stack navigator
Expo Router usa Native Stack per gli header/navigazione nativa:

```bash
    npm i @react-navigation/native-stack
```

📦 Riepilogo comandi da eseguire ora

```bash
    npm i formik yup axios
```
```bash
  npx expo install @react-native-async-storage/async-storage expo-secure-store
```

```bash
  npm i @react-navigation/native-stack
```
```javascript
    app/
    (auth)/
    login.tsx
    register.tsx
    (app)/
    index.tsx        ← home protetta (mock)_layout.tsx        ← decide se mostrare (auth) o (app) in base a user
    src/
    context/AuthContext.tsx
    services/authClient.ts        ← oggi mock, domani API (stessa interfaccia)
    mock/authMock.ts              ← finto backend in-memory
    ui/ (componenti UI riusabili)

```

