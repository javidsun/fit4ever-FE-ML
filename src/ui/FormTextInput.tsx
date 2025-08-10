import React from "react";
import { TextInput, View, Text } from "react-native";

export default function FormTextInput({
                                          label,
                                          error,
                                          ...props
                                      }: { label: string; error?: string } & React.ComponentProps<typeof TextInput>) {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 8, fontWeight: "700", fontSize: 14, color: "#374151" }}>{label}</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: error ? "#ef4444" : "#d1d5db",
                    borderRadius: 12,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    backgroundColor: "#f9fafb",
                    fontSize: 16,
                    shadowColor: "#000",
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                }}
                placeholderTextColor="#9ca3af"
                {...props}
            />
            {!!error && <Text style={{ color: "#ef4444", marginTop: 6, fontSize: 13 }}>{error}</Text>}
        </View>
    );
}
