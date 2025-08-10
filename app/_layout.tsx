// app/_layout.tsx
import "react-native-gesture-handler";
import "react-native-reanimated";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";

SplashScreen.preventAutoHideAsync().catch(() => {});
const AUTH_ENTRY = "/(app)"; // se usi (tabs), metti "/(tabs)"

function RouteGuard() {
  const seg = useSegments();
  const navReady = !!useRootNavigationState()?.key;
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready || !navReady) return;
    const top = seg[0]; // "(auth)" | "(app)" | "(tabs)"
    if (user && top === "(auth)") router.replace(AUTH_ENTRY);
    if (!user && top !== "(auth)") router.replace("/(auth)/login");
  }, [seg, navReady, user, ready]);

  return <Slot />;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => { if (loaded) SplashScreen.hideAsync().catch(() => {}); }, [loaded]);
  if (!loaded) return null;

  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider>
            <ThemeProvider value={theme}>
              <RouteGuard />
            </ThemeProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}
