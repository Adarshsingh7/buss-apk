import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingScreen = function ({}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        marginHorizontal: "auto",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#a9a9e8" />
      {/* <Text>Loading...</Text> */}
    </View>
  );
};

export default LoadingScreen;
