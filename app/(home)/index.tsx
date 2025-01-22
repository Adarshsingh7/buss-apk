import React, { useEffect } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import TrainStopContainer from "@/components/StopContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StopType, UserType } from "@/app/types";
import { useGetUserRoute } from "@/features/route/route.hook";
import LoadingScreen from "@/components/LoadingScreen";
import { location } from "@/features/location/location.service";

export default function index() {
  const { data: activeUser } = useQuery<UserType>({ queryKey: ["user"] });
  const { data: loc } = useQuery({
    queryKey: ["location"],
    queryFn: () => location.getLocationFromRoute(activeUser?.route || ""),
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: ["stops"] });
      return 1;
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const { filteredStop: data, isLoading } = useGetUserRoute();

  if (isLoading) return <LoadingScreen />;

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noStopsText}>Huray! you have no stops</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: StopType | undefined }) => (
    <TrainStopContainer
      arrivalTime={item?.arrivalTime}
      dispatchTime={item?.arrivalTime}
      stopName={item?.name}
      status={item?.arrivalStatus}
      id={item?._id}
    />
  );

  if (!data) return <LoadingScreen />;

  return (
    <Animated.FlatList
      data={data}
      renderItem={(data) => renderItem(data)}
      keyExtractor={(item, index) => index.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: new Animated.Value(0) } } }],
        { useNativeDriver: true },
      )}
    />
  );
}

const styles = StyleSheet.create({
  noStopsText: {
    color: "#000",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
