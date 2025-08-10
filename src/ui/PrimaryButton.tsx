import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from "react-native";

export default function PrimaryButton({
                                          title,
                                          onPress,
                                          loading,
                                          style,
                                      }: {
    title: string;
    onPress: () => void;
    loading?: boolean;
    style?: ViewStyle;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            style={{
                backgroundColor: "#2563eb",
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 3,
                ...style,
            }}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}
