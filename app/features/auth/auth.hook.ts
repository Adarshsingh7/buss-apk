import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import auth from "./auth.service";
import { useRouter } from "expo-router";

const useLogout = () => {
  const navigation = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: () => {
      console.log("logout success");
      queryClient.invalidateQueries({ queryKey: ["route"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigation.navigate("../");
    },
  });
};

const useReAuth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => auth.isAuthenticated(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export { useLogout, useReAuth };
