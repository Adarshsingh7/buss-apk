import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Platform } from "react-native";
import * as Device from "expo-device";

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  let subscription: Location.LocationSubscription | null = null;

  async function startLocationUpdates() {
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!",
      );
      setIsFetching(false);
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setIsFetching(false);
      return;
    }

    if (subscription == null) {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
          setIsFetching(false);
        },
      );
    }
  }

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  function stopLocationUpdates() {
    if (subscription) {
      subscription.remove();
      subscription = null;
      setIsFetching(false);
    }
  }

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  } else if (isFetching) {
    text = "Fetching location...";
  }

  return {
    location,
    errorMsg,
    isFetching,
    text,
    startLocationUpdates,
    stopLocationUpdates,
  };
}
