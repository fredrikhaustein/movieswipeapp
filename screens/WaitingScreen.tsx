import { View, Text } from "react-native";
import { useStoreGamePin } from "../store/MovieFilter";
import { COLORS } from "../values/colors"

export const WaitingScreen = ({ navigation }: any) => {
  const gamePinToGroup = useStoreGamePin((state) => state.gamePin);
  console.log(gamePinToGroup);
  return (
    <>
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.background,
        }}
        //Dummy for å komme videre til Filmserver
        onTouchEnd={() => {
          navigation.navigate("SwipeScreen");
        }}
      >
        {<Text style={{ fontSize: 30 }}>GroupId: {gamePinToGroup}</Text>}
        <Text>Waiting for Host to start session</Text>
      </View>
    </>
  );
};

export default WaitingScreen;
