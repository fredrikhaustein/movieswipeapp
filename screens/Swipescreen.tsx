import { Button, View, Text } from "react-native";
import { db, firebaseAuth } from "../firebaseConfig";

export const SwipeScreen = ({ navigation }: any) => {
  const auth = firebaseAuth;
  console.log(auth.currentUser);

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
