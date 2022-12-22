import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, firebaseAuth } from "../firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useStoreGamePin } from "../store/MovieFilter";
import { COLORS } from "../values/colors";

export const HomeScreen = ({ navigation }: any) => {
  const [groupID, setGroupID] = useState<string>();
  const [errorWithGroupID, setErrorWithGroupID] = useState<boolean>(false);
  const [errorOnJoiningGroup, setErrorOnJoiningGroup] = useState<string>("");
  const setGamePin = useStoreGamePin((state) => state.setGamePin);
  const gamePinToGroup = useStoreGamePin((state) => state.gamePin);

  const handleSignIn = async () => {
    signInAnonymously(firebaseAuth)
      .then(() => navigation.navigate("SwipeScreen", { type: "anonymous" }))
      .catch((error) => {
        setErrorOnJoiningGroup("Something went wrong while joining the group");
        console.log(error.message);
      });
  };

  const handleAddUserToFireStore = async () => {
    await updateDoc(doc(db, "Groups", `${groupID}`), {
      Users: arrayUnion(`${firebaseAuth.currentUser?.uid}`),
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleOnJoinGroup = async () => {
    console.log("here is your groupid", groupID);

    const allGroupIds: string[] = [];

    const querySnapshot = await getDocs(collection(db, "Groups"));
    querySnapshot.forEach((doc) => {
      allGroupIds.push(doc.id);
    });
    console.log(allGroupIds);

    if (groupID && allGroupIds.includes(groupID)) {
      handleSignIn();
      handleAddUserToFireStore();
      navigation.navigate("SwipeScreen");
      setGamePin(groupID);
    } else {
      setErrorWithGroupID(true);
    }
  };

  useEffect(() => console.log(groupID), [groupID]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <View>
          <Text style={{ fontSize: 40, margin: 10, textAlign: "center" }}>
            Welcome to Movieswiper
          </Text>
          <Text style={styles.textField}>Group Code:</Text>
          <TextInput
            placeholder="CODE"
            keyboardType="numeric"
            onChangeText={(value) => {
              setGroupID(value);
              setErrorWithGroupID(false);
            }}
            maxLength={6}
            style={styles.inputField}
          />
          <View>
            {errorWithGroupID && (
              <Text>
                {<Icon name="warning" color="black" />}You have Written the
                wrong code {<Icon name="warning" color="black" />}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOnJoinGroup}>
          <Text style={styles.textField_button}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateNewGroupScreen")}
        >
          <Text style={styles.textField_button}>Create new group</Text>
        </TouchableOpacity>
        {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
      title="Go to swipecard"
      onPress={() => navigation.navigate("SwipeScreen")}
    /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputField: {
    borderColor: COLORS.main,
    width: 200,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 25,
    margin: 15,
  },
  textField: {
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  textField_button: {
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    color: COLORS.background,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    elevation: 3,
    borderColor: COLORS.main,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    margin: 10,
  },
});
