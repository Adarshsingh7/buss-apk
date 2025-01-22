import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { auth } from "@/features/auth/auth.service";
import { useReAuth } from "@/features/auth/auth.hook";
import Button from "@/components/Button";

const queryClient = new QueryClient();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useRouter();
  const { data: activeUser, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: auth.isAuthenticated,
  });

  const { mutate: reAuth, isPending: reAuthenicating } = useReAuth();

  const handleLogin = async () => {
    if (email && password) {
      await auth.login({ email, password });
      reAuth();
    } else {
      Alert.alert("Error", "Please enter both email and password");
    }
  };

  useEffect(() => {
    if (activeUser) navigation.navigate("/(home)");
  }, [isPending, reAuthenicating]);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />

        <Button title="Login" onPress={handleLogin} loading={isPending} />

        <Text style={styles.footerText}>
          Don't have an account?
          <Text
            style={styles.link}
            onPress={() => Alert.alert("Signup not allowed, contact to ADMIN`")}
          >
            Sign up
          </Text>
        </Text>
        <Link href="/(home)">go to home</Link>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafd",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    color: "#666",
  },
  link: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
