import { useCallback, useEffect } from "react";
import { useAirDropAnimation } from "./useAirDropAnimation";
import { useCurrentLocation } from "./useCurrentLocation";
import { useNotification } from "./useNotification";

interface Props {
  customFunction?: () => void;
}

export const useGPSNavigation = ({ customFunction }: Props) => {
  const {
    location,
    startLocationUpdates,
    stopLocationUpdates,
    isFetching,
    errorMsg,
  } = useCurrentLocation();
  const { onCancelNotification, scheduleNotification } = useNotification({
    body: "sharing of live location is active",
    category: "location-sharing",
    title: "Location Sharing",
    onCancelNotification: customFunction,
  });

  const startGPSNavigationService = async () => {
    startLocationUpdates();
    scheduleNotification();
  };

  const stopGPSNavigationService = () => {
    stopLocationUpdates();
    onCancelNotification();
  };

  return { startGPSNavigationService, stopGPSNavigationService };
};
