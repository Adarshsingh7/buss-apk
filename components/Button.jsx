import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { useTheme } from "@/context/themeContext";

const Button = (props) => {
  const {
    title = "Button",
    onPress,
    disabled = false,
    loading = false,
    buttonStyle = {},
    textStyle = {},
    icon = null,
    color,
  } = props;

  const { theme } = useTheme();
  const buttonColor = color || theme.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        { backgroundColor: buttonColor },
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF", // iOS blue color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android shadow
    flexDirection: "row",
    width: "100%", // Full width
  },
  disabledButton: {
    backgroundColor: "#A9A9A9", // Gray for disabled
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF", // White text
    textAlign: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
});

export default Button;
