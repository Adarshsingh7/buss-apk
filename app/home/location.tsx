import { StyleSheet, View, Pressable, Text, Animated } from "react-native";
import { useAirDropAnimation } from "../hooks/useAirDropAnimation";
import { useLocationNotification } from "../hooks/useLocationNotification";

export default function LocationPage() {
  const { animations, isSendingLocation, setIsSendingLocation } =
    useAirDropAnimation();
  const { scheduleNotification, onCancelNotification } =
    useLocationNotification();

  function handleToggleLocationSharing() {
    setIsSendingLocation((prev) => !prev);
    if (isSendingLocation) {
      onCancelNotification();
    } else {
      scheduleNotification();
    }
  }

  return (
    <View style={styles.container}>
      {/* Main circle container */}
      <View style={styles.circleContainer}>
        {/* Animated waves */}
        {animations.map((animation, index) => (
          <Animated.View
            key={index}
            style={[
              styles.wave,
              {
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 2],
                    }),
                  },
                ],
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 0],
                }),
              },
            ]}
          />
        ))}

        {/* Center circle */}
        <View style={styles.centerCircle} />
      </View>

      {/* Start button */}
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.8 : 1 }]}
        onPress={handleToggleLocationSharing}
      >
        <Text style={styles.buttonText}>
          {!isSendingLocation ? "Start" : "Stop"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100, // Space for button at bottom
  },
  circleContainer: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  centerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    position: "absolute",
  },
  wave: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    position: "absolute",
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
