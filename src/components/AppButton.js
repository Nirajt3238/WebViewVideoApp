import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AppButton({ title, onPress, variant = "primary" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "secondary" && styles.secondary,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F46E5", 
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: "#22C55E",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
