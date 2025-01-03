import { RouteType, StopType, UserType } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { route } from "./route.service";
import { stop } from "../stop/stop.service";

const useGetUserRoute = function () {
  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ["user"],
  });
  const { data: userRoute, isLoading: routeLoading } = useQuery<RouteType>({
    queryKey: ["route"],
    queryFn: async () => {
      if (user && user.route) {
        return route.getRoutes(user.route);
      }
      return Promise.reject(new Error("User route is not defined"));
    },
    enabled: !!user, // Only run after user query completes
  });
  const { data: stops, isLoading: stopLoading } = useQuery<StopType[]>({
    queryKey: ["stops"],
    queryFn: () => stop.getAllStops(),
  });

  const filteredStop = stops?.filter((stop) =>
    userRoute?.stops?.some((el) => el === stop._id),
  );

  const isLoading = userLoading || routeLoading || stopLoading;

  return { filteredStop, isLoading };
};

export { useGetUserRoute };
