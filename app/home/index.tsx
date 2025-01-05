import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import TrainStopContainer from "../components/StopContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StopType, UserType } from "../types";
import convertStringToTime from "../utils/dateFormat";
import { useGetUserRoute } from "../features/route/route.hook";
import LoadingScreen from "../components/LoadingScreen";

export default function index() {
  const { data: activeUser } = useQuery<UserType>({ queryKey: ["user"] });

  const { filteredStop: data, isLoading } = useGetUserRoute();

  if (isLoading) return <LoadingScreen />;

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
