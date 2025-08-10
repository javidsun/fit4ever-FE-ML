# 📱 BodyFit AI – Architettura & Setup

## 📌 Descrizione del Progetto
**BodyFit AI** è un'app mobile basata su **Intelligenza Artificiale** che permette agli utenti di:
- Analizzare la forma del corpo da foto (AI: OpenCV + TensorFlow/PyTorch)
- Ricevere un programma di allenamento e dieta personalizzato
- Monitorare i progressi con foto settimanali e grafici
- Mantenere la privacy e sicurezza dei dati

L'app è sviluppata in **architettura a microservizi** per garantire modularità e scalabilità.

---

## 🛠️ Tecnologie Utilizzate
- **Backend:** Python (FastAPI)
- **Mobile App:** React Native
- **AI:** OpenCV + TensorFlow/PyTorch
- **Database:** PostgreSQL o MongoDB
- **Storage Immagini:** Cloudinary o AWS S3
- **Report & Grafici:** Recharts o D3.js
- **CI/CD (opzionale):** Jenkins

---

## 🧩 Architettura Microservizi

| Microservizio         | Funzione                                                | Tecnologia |
|----------------------|--------------------------------------------------------|------------|
| `auth_service`       | Login, registrazione, JWT token                        | FastAPI    |
| `profile_service`    | Gestione dati profilo, foto iniziale                    | FastAPI    |
| `ai_analyzer_service`| Analisi foto corpo con AI                               | FastAPI    |
| `program_service`    | Generazione piano allenamento & dieta                   | FastAPI    |
| `progress_service`   | Dashboard, grafici e comparazione foto                  | FastAPI    |
| `frontend_mobile`    | App React Native per iOS/Android                        | React Native |
| `api_gateway` (opt.) | Smistamento richieste tra microservizi                  | NGINX/FastAPI |

---

## 📂 Struttura del Progetto
bodyfit-ai/
├── auth_service/
├── profile_service/
├── ai_analyzer_service/
├── program_service/
├── progress_service/
├── frontend_mobile/
├── docker-compose.yml (opzionale)
└── README.md



---

## ⚙️ Setup Ambiente su macOS

### 1️⃣ Strumenti di base
```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python
brew install python

# Node.js
brew install node

# Git
brew install git

# Watchman (per React Native)
brew install watchman


2️⃣ IDE Consigliati
PyCharm → Backend (FastAPI + AI)

WebStorm → Frontend (React Native)

Xcode → Simulator iOS

Android Studio → Emulator Android


npm install -g expo-cli
npx create-expo-app frontend_mobile
cd frontend_mobile
npm start


3️⃣ Setup React Native (Mobile App)
Con Expo (più semplice)
bash
Copia
Modifica


npm install -g expo-cli
npx create-expo-app frontend_mobile
cd frontend_mobile
npm start


Con React Native CLI
bash
Copia
Modifica


npx react-native init frontend_mobile
cd frontend_mobile
npx react-native run-ios


Pacchetti utili:

bash
Copia
Modifica

npm install axios react-navigation react-native-image-picker


4️⃣ Setup Backend FastAPI
bash
Copia
Modifica


mkdir auth_service && cd auth_service
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn[standard] python-jose[cryptography] passlib[bcrypt]


Esempio main.py per Auth Service:

python
Copia
Modifica


from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

app = FastAPI()

SECRET_KEY = "super-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

users_db = {
    "user@example.com": {
        "email": "user@example.com",
        "hashed_password": "$2b$12$examplehash"
    }
}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def authenticate_user(email, password):
    user = users_db.get(email)
    if not user or not verify_password(password, user["hashed_password"]):
        return False
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}


Avvio backend:

bash
Copia
Modifica

uvicorn main:app --reload


5️⃣ Database – PostgreSQL
bash
Copia
Modifica


brew install postgresql
brew services start postgresql
psql postgres
CREATE DATABASE bodyfit;


Connessione con SQLAlchemy:

bash
Copia
Modifica


pip install psycopg2-binary sqlalchemy


6️⃣ Storage Immagini – Cloudinary
bash
Copia
Modifica


pip install cloudinary


Configurazione:

python
Copia
Modifica


import cloudinary
cloudinary.config(
  cloud_name = "CLOUD_NAME",
  api_key = "API_KEY",
  api_secret = "API_SECRET"
)


7️⃣ CI/CD – Jenkins (opzionale)
bash
Copia
Modifica


brew install jenkins-lts
brew services start jenkins-lts
open http://localhost:8080


🔒 Sicurezza Microservizi
Tutte le API richiedono JWT token valido

Comunicazione tra servizi tramite HTTPS

Storage immagini protetto (ACL privata su S3 o Cloudinary)


🚀 Prossimi Step
Implementare Auth Service completo con registrazione e login

Creare Profile Service per gestione dati utente

Implementare AI Analyzer Service con TensorFlow/OpenCV

Collegare il frontend React Native ai microservizi

Preparare docker-compose per avviare tutto insieme


---

Se vuoi, posso aggiungere a questo **README** anche il **diagramma dell’architettura microservizi** così è più visivo.  
Vuoi che lo faccio?


    
## 🖐️ Safe Area & Gesture Handler nel Root Layout

Per garantire un corretto comportamento delle gesture (swipe, transizioni, drawer) e la gestione sicura dello spazio sugli schermi con notch o status bar, il `RootLayout` è stato modificato per includere due wrapper fondamentali:

### 1. `GestureHandlerRootView`
- **Scopo:** necessario per far funzionare correttamente tutte le gesture di `react-native-gesture-handler` e `@react-navigation`.
- **Posizionamento:** deve avvolgere l'intera applicazione (livello più alto possibile).

### 2. `SafeAreaProvider`
- **Scopo:** evita che i contenuti vengano nascosti dalla status bar o dal notch su iOS e Android.
- **Posizionamento:** subito sotto il `GestureHandlerRootView`.

### Implementazione in `app/_layout.tsx`
```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


⚠️ Nota: assicurati di avere installato react-native-gesture-handler:

bash
Copia
Modifica


npx expo install react-native-gesture-handler


Con questa configurazione:

Le gesture funzioneranno senza bug.

I contenuti saranno sempre visibili in aree sicure (safe area).

La struttura è pronta per supportare navigation e transizioni complesse.


---

Se vuoi, Javid, posso anche **aggiungere uno screenshot della struttura finale delle cartelle** al README così chiunque apra il progetto capisce subito dove sta `_layout.tsx` e `(tabs)/_layout.tsx`.  
Vuoi che lo faccia?


---

Se vuoi, Javid, posso anche **aggiungere uno screenshot della struttura finale delle cartelle** al README così chiunque apra il progetto capisce subito dove sta `_layout.tsx` e `(tabs)/_layout.tsx`.  
Vuoi che lo faccia?


installazione dipendenza per il gif 

npx expo install expo-image
