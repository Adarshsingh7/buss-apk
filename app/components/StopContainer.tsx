import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { UserType } from "../types";
import { useChangeStopStatus } from "../features/stop/stop.hook";
import LoadingScreen from "./LoadingScreen";
import DialogAction from "./DialogAction";

const TrainStopContainer = ({
  stopName = "Station A",
  arrivalTime = "10:30 AM",
  dispatchTime = "10:40 AM",
  lateStatus = false,
  distance = "5 km",
  status = "waiting",
  id = "0",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const lateColor = lateStatus ? "#FF4C4C" : "#4CAF50";
  const { data: authUser } = useQuery<UserType>({ queryKey: ["user"] });
  const { mutate, isPending } = useChangeStopStatus();

  const handleStatusChange = (newStatus: "arrived" | "waiting") => {
    setModalVisible(false);
    mutate({ id, arrivalStatus: newStatus });
  };

  // if (isPending) return <LoadingScreen />;

  return (
    <View
      style={status === "waiting" ? styles.container : styles.coloredContainer}
    >
      <View style={styles.header}>
        <Text style={styles.stopName}>{stopName}</Text>
        <Text style={[styles.lateStatus, { color: lateColor }]}>
          {lateStatus ? "Late" : "On Time"}
        </Text>
      </View>
      {isPending && <LoadingScreen />}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Arrival</Text>
          <Text style={styles.value}>{arrivalTime}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Dispatch</Text>
          <Text style={styles.value}>{dispatchTime}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{distance}</Text>
        </View>
        {authUser?.role === "driver" && (
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.bellIcon}>
              <FontAwesome name="exchange" size={24} color="black" />
            </Text>
          </Pressable>
        )}
      </View>
      {authUser?.role === "driver" && modalVisible && (
        <DialogAction
          text="Change status of stop"
          action1={() => handleStatusChange("arrived")}
          actionKey1="Arrival"
          action2={() => handleStatusChange("waiting")}
          actionKey2="Waiting"
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  coloredContainer: {
    backgroundColor: "#C8E6C9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  stopName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lateStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  detailItem: {
    flex: 1,
    marginRight: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  bellIcon: {
    fontSize: 24,
    color: "#000",
  },
});

export default TrainStopContainer;
