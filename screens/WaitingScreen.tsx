import { View, Text } from "react-native"
import { COLORS } from "../values/colors"

export const WaitingScreen = ({ navigation }: any) => 
{
    return (
        <>

        <View
            style={{
                flex: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.yellow,
            }}
            //Dummy for å komme videre til Filmserver
            onTouchEnd={() => {
                navigation.navigate("SwipeScreen")
            }}
            >

        <Text>Waiting for Host to start session</Text>
        </View>
        </>
    )
}

export default WaitingScreen;