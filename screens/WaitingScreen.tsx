import { View, Text } from "react-native"

export const WaitingScreen = ({ navigation }: any) => 
{
    return (
        <>

        <View
            style={{
                flex: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FDDA0D",
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