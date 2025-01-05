import { useCallback, useEffect } from "react";
import { useAirDropAnimation } from "./useAirDropAnimation";
import { useCurrentLocation } from "./useCurrentLocation";
import { useNotification } from "./useNotification";

export const useGPSNavigation = () => {
  const {
    location,
    startLocationUpdates,
    stopLocationUpdates,
    isFetching,
    errorMsg,
  } = useCurrentLocation();
  const {
    onCancelNotification,
    scheduleNotification,
    customNotificationClose,
  } = useNotification({
    body: "sharing of live location is active",
    category: "location-sharing",
    title: "Location Sharing",
  });

  const startGPSNavigationService = async () => {
    startLocationUpdates();
    scheduleNotification();
  };

  const stopGPSNavigationService = (fn: () => void) => {
    stopLocationUpdates();
    onCancelNotification();
    customNotificationClose(fn);
  };

  return { startGPSNavigationService, stopGPSNavigationService };
};
