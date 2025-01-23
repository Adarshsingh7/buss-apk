import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface ThemeContextType {
  themeMode: string;
  toggleTheme: () => void;
  theme: {
    background: string;
    heading: string;
    text: string;
    primary: string;
    secondary: string;
    gray: string;
  };
  changePrimiaryColor: (color: string) => void;
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#512DA8");

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const theme = {
    background: themeMode === "light" ? "#FAFAFA" : "#212121",
    primary: primaryColor,
    text: themeMode === "light" ? "#212121" : "#FAFAFA",
    heading: themeMode === "light" ? "#0070C9" : "#003366",
    secondary: themeMode === "light" ? "#FFFFFF" : "#808080",
    gray: "#6E6E6E",
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
        theme,
        changePrimiaryColor: setPrimaryColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
