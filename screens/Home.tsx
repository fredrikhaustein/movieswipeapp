import { Button, View, Text } from "react-native";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDDA0D",
      }}
    >
      <Text style={{ fontSize: 40, margin: 10 }}>Welcome to Movieswiper</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Go to swipecard"
        onPress={() => navigation.navigate("SwipeScreen")}
      />
    </View>
  );
};

export default HomeScreen;
