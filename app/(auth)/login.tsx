import React from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/src/context/AuthContext";
import FormTextInput from "../../src/ui/FormTextInput";
import PrimaryButton from "../../src/ui/PrimaryButton";
import { Link } from "expo-router";

const schema = Yup.object({
    email: Yup.string().email("Email non valida").required("Obbligatoria"),
    password: Yup.string().min(8, "Min 8 caratteri").required("Obbligatoria"),
});

export default function LoginScreen() {
    const { login } = useAuth();
    const f = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async (v, h) => {
            try {
                await login(v.email, v.password);
            } catch (e: any) {
                Alert.alert("Errore", e?.message ?? "Login fallito");
            } finally {
                h.setSubmitting(false);
            }
        },
    });

    return (
        <View style={{ flex: 1, padding: 20, gap: 12, justifyContent: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 8 }}>Bentornato</Text>
            <FormTextInput
                label="Email"
                value={f.values.email}
                onChangeText={f.handleChange("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                error={f.touched.email ? (f.errors.email as string) : undefined}
            />
            <FormTextInput
                label="Password"
                value={f.values.password}
                onChangeText={f.handleChange("password")}
                secureTextEntry
                error={f.touched.password ? (f.errors.password as string) : undefined}
            />
            <PrimaryButton title="Accedi" onPress={f.handleSubmit as any} loading={f.isSubmitting} />

            <View style={{ alignItems: "center", marginTop: 12 }}>
                <Text>
                    Non hai un account?{' '}
                    <Link href="/(auth)/register" style={{ color: "#2563eb", fontWeight: "700" }}>Registrati</Link>
                </Text>
            </View>

            {/* Dev shortcut */}
            <Pressable onPress={() => { f.setFieldValue('email','test@example.com'); f.setFieldValue('password','password123'); }}>
                <Text style={{ marginTop: 16, textAlign: 'center', color: '#6b7280' }}>Auto-riempi (dev)</Text>
            </Pressable>
        </View>
    );
}
