import React from "react";
import { View, Text, Alert } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/src/context/AuthContext";
import FormTextInput from "../../src/ui/FormTextInput";
import PrimaryButton from "../../src/ui/PrimaryButton";
import { Link } from "expo-router";

const schema = Yup.object({
    email: Yup.string().email("Email non valida").required("Obbligatoria"),
    password: Yup.string().min(8, "Min 8 caratteri").required("Obbligatoria"),
    confirm: Yup.string().oneOf([Yup.ref("password")], "Non coincide").required("Obbligatoria"),
});

export default function RegisterScreen() {
    const { register } = useAuth();
    const f = useFormik({
        initialValues: { email: "", password: "", confirm: "" },
        validationSchema: schema,
        onSubmit: async (v, h) => {
            try {
                await register(v.email, v.password);
            } catch (e: any) {
                Alert.alert("Errore", e?.message ?? "Registrazione fallita");
            } finally {
                h.setSubmitting(false);
            }
        },
    });

    return (
        <View style={{ flex: 1, padding: 20, gap: 12, justifyContent: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 8 }}>Crea il tuo account</Text>
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
            <FormTextInput
                label="Conferma Password"
                value={f.values.confirm}
                onChangeText={f.handleChange("confirm")}
                secureTextEntry
                error={f.touched.confirm ? (f.errors.confirm as string) : undefined}
            />
            <PrimaryButton title="Registrati" onPress={f.handleSubmit as any} loading={f.isSubmitting} />

            <View style={{ alignItems: "center", marginTop: 12 }}>
                <Text>
                    Hai già un account?{' '}
                    <Link href="/(auth)/login" style={{ color: "#2563eb", fontWeight: "700" }}>Accedi</Link>
                </Text>
            </View>
        </View>
    );
}
