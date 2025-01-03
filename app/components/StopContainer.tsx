import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TrainStopContainer = ({
  stopName = "Station A",
  arrivalTime = "10:30 AM",
  dispatchTime = "10:40 AM",
  timeLeft = "5 min",
  lateStatus = false,
  distance = "5 km",
}) => {
  const lateColor = lateStatus ? "#FF4C4C" : "#4CAF50"; // Red for late, green for on-time

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stopName}>{stopName}</Text>
        <Text style={[styles.lateStatus, { color: lateColor }]}>
          {lateStatus ? "Late" : "On Time"}
        </Text>
      </View>
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
          <Text style={styles.label}>Time Left</Text>
          <Text style={styles.value}>{timeLeft}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{distance}</Text>
        </View>
      </View>
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
});

export default TrainStopContainer;
