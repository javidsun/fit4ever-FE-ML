import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import PrimaryButton from "../../src/ui/PrimaryButton";

export default function HomeScreen() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Nessun utente loggato</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
            <Text style={{ fontSize: 18, marginBottom: 6 }}>Ciao {user.email}</Text>
            <Text style={{ color: "#6b7280", marginBottom: 20 }}>Sei autenticato (mock)</Text>
            <PrimaryButton title="Logout" onPress={logout} />
        </View>
    );
}
