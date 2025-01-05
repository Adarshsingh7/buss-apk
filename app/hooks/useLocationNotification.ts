import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { useRegisterPushNotifications } from "./useRegisterPushNotification";

export const useLocationNotification = () => {
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const { status } = useRegisterPushNotifications();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  Notifications.setNotificationCategoryAsync("location-category", [
    {
      identifier: "cancel-action",
      buttonTitle: "Cancel",
      options: {
        isDestructive: true,
        opensAppToForeground: false,
      },
    },
  ]);

  Notifications.addNotificationResponseReceivedListener((response) => {
    if (response.actionIdentifier === "cancel-action") {
      handleCancelAction(); // Run the custom function
    }
  });

  // Custom function to handle "Cancel" action
  async function handleCancelAction() {
    if (notificationId) {
      await Notifications.dismissNotificationAsync(notificationId);
    }
  }

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response.actionIdentifier === "cancel-action") {
          handleCancelAction();
        }
      },
    );
    return () => subscription.remove();
  }, [notificationId]);

  async function scheduleNotification() {
    if (status === "granted") {
      // Schedule the notification
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Location Sharing",
          body: "Location sharing is active.",
          categoryIdentifier: "location-category", // Associate category
        },
        trigger: null,
      });

      if (id) setNotificationId(id);
    } else {
      console.log("Notification permissions not granted.");
    }
  }

  return { scheduleNotification, onCancelNotification: handleCancelAction };
};
