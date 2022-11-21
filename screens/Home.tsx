import { useState } from "react";
import { Button, View, Text, TextInput } from "react-native";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const HomeScreen = ({ navigation }: any) => {
  const [groupID, setGroupID] = useState<Number>();
  const [submitedGroupID, setSubmittedGroupID] = useState<Number>();

  const [errorWithGroupID, setErrorWithGroupID] = useState<String>("");

  const handleOnJoinGroup = () => {
    setSubmittedGroupID(groupID);

    const groupRef = collection(firestore, "Groups");

    const q = query(groupRef, where("GroupID", "==", `${submitedGroupID}`));

    if (q) {
      navigation.navigate("Details");
    } else {
      setErrorWithGroupID("Wrong groupid");
    }
  };

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
      <Text>Group Code:</Text>
      <TextInput
        placeholder="CODE"
        keyboardType="numeric"
        onChangeText={(value) => setGroupID(parseInt(value))}
      />
      <Button title="Join" onPress={handleOnJoinGroup} />
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
