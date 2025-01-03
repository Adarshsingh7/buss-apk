import { ActivityIndicator, Text, View } from "react-native";

const LoadingScreen = function ({}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
