import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { UserType } from "../types";

const TrainStopContainer = ({
  stopName = "Station A",
  arrivalTime = "10:30 AM",
  dispatchTime = "10:40 AM",
  timeLeft = "5 min",
  lateStatus = false,
  distance = "5 km",
  status = "waiting",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const lateColor = lateStatus ? "#FF4C4C" : "#4CAF50";
  const { data: authUser } = useQuery<UserType>({ queryKey: ["user"] });

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setModalVisible(false);
  };

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <View
      style={
        currentStatus === "waiting" ? styles.container : styles.coloredContainer
      }
    >
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
      {authUser?.role === "driver" && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.fullWidthModalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>
                  <Entypo name="cross" size={24} color="black" />
                </Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Mark stop as:</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleStatusChange("arrived")}
              >
                <Text style={styles.buttonText}>Arrived</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleStatusChange("waiting")}
              >
                <Text style={styles.buttonText}>Waiting</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullWidthModalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
  },
});

export default TrainStopContainer;
