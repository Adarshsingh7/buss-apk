import { useState, useEffect } from "react";
import * as Location from "expo-location";
// import * as Sentry from "@sentry/react-native";

const useBackgroundPermission = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();

      if (foregroundStatus === "granted" && backgroundStatus === "granted") {
        setPermissionGranted(true);
        console.log("Permission granted for location tracking");
      } else {
        console.log("Permission denied for location tracking");
        // Sentry.captureException(new Error("Location permissions denied"));
        setPermissionGranted(false);
      }
    };

    requestPermissions();
  }, []);

  return permissionGranted;
};

export default useBackgroundPermission;
