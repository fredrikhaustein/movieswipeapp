import { Button, View, Text } from "react-native";

export const SwipeScreen = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDDA0D",
      }}
    >
      <Text>Swipe Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SwipeScreen;
