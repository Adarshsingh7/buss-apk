import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View, Pressable, Text, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LocationPage() {
  // Create multiple animated values for different waves
  const animations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Animation sequence for waves
  const startAnimation = useCallback(() => {
    // Reset animations
    animations.forEach((anim) => anim.setValue(0));

    // Create staggered animations
    const createWaveAnimation = (animation: Animated.Value, delay: number) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]);
    };

    // Start animations with different delays
    Animated.parallel(
      animations.map((animation, index) =>
        createWaveAnimation(animation, index * 666),
      ),
    ).start();
  }, []);

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
        onPress={startAnimation}
      >
        <Text style={styles.buttonText}>Start</Text>
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
