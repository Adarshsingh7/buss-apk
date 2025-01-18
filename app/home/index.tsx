import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import TrainStopContainer from "../components/StopContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { StopType, UserType } from "../types";
import convertStringToTime from "../utils/dateFormat";
import { useGetUserRoute } from "../features/route/route.hook";
import LoadingScreen from "../components/LoadingScreen";
import { location } from "../features/location/location.service";

export default function index() {
  const { data: activeUser } = useQuery<UserType>({ queryKey: ["user"] });
  const { data: loc } = useQuery({
    queryKey: ["location"],
    queryFn: () => location.getLocationFromRoute(activeUser?.route || ""),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: ["stops"] });
      return 1;
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const { filteredStop: data, isLoading } = useGetUserRoute();

  if (isLoading) return <LoadingScreen />;

  // if()

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noStopsText}>Huray! you have no stops</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {data.map((stop, i) => (
        <TrainStopContainer
          key={i}
          arrivalTime={stop.arrivalTime}
          dispatchTime={stop.arrivalTime}
          stopName={stop.name}
          status={stop.arrivalStatus}
          id={stop._id}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noStopsText: {
    color: "#000",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
