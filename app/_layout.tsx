import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import CustomHeader from "./components/header";
import { Provider as PaperProvider } from "react-native-paper";

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: 0 }, queries: { retry: 0 } },
});
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Main",
              header: () => <CustomHeader title="Login" />,
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              title: "index",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              title: "login",
              headerShown: false,
            }}
          />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
