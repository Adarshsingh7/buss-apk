import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

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
  changePrimaryColor: (color: string) => void;
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// AsyncStorage keys
const THEME_MODE_KEY = "themeMode";
const PRIMARY_COLOR_KEY = "primaryColor";

// Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#512DA8");

  // Load theme mode and primary color from AsyncStorage on mount
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const storedThemeMode = await AsyncStorage.getItem(THEME_MODE_KEY);
        const storedPrimaryColor =
          await AsyncStorage.getItem(PRIMARY_COLOR_KEY);

        if (storedThemeMode) setThemeMode(storedThemeMode);
        if (storedPrimaryColor) setPrimaryColor(storedPrimaryColor);
      } catch (error) {
        console.error("Failed to load theme settings:", error);
      } finally {
        // setIsLoading(false);
        SplashScreen.hideAsync(); // Hide splash screen once done
      }
    };

    loadThemeSettings();
  }, []);
  // Persist theme mode to AsyncStorage
  const toggleTheme = async () => {
    try {
      const newThemeMode = themeMode === "light" ? "dark" : "light";
      setThemeMode(newThemeMode);
      await AsyncStorage.setItem(THEME_MODE_KEY, newThemeMode);
    } catch (error) {
      console.error("Failed to save theme mode to storage:", error);
    }
  };

  // Persist primary color to AsyncStorage
  const changePrimaryColor = async (color: string) => {
    try {
      setPrimaryColor(color);
      await AsyncStorage.setItem(PRIMARY_COLOR_KEY, color);
    } catch (error) {
      console.error("Failed to save primary color to storage:", error);
    }
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
        changePrimaryColor,
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
