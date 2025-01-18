import LoginScreen from "./login";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  return (
    <PaperProvider>
      <LoginScreen />
    </PaperProvider>
  );
}
