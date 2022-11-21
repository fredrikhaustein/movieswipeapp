import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const HomeScreen = ({ navigation }: any) => {
  const [groupID, setGroupID] = useState<string>();
  const [errorWithGroupID, setErrorWithGroupID] = useState<boolean>(false);

  const handleOnJoinGroup = async () => {
    console.log("her er groupid", groupID);

    const allGroupIds: string[] = [];

    const querySnapshot = await getDocs(collection(db, "Groups"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      allGroupIds.push(doc.id);
      console.log(`${doc.id} => ${doc.data()}`);
    });
    console.log(allGroupIds);

    if (groupID && allGroupIds.includes(groupID)) {
      navigation.navigate("Details");
    } else {
      setErrorWithGroupID(true);
    }
  };

  useEffect(() => console.log(groupID), [groupID]);

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
      <Text style={styles.textField}>Group Code:</Text>
      <TextInput
        placeholder="CODE"
        keyboardType="numeric"
        onChangeText={(value) => setGroupID(value)}
        maxLength={6}
        style={styles.inputField}
      />
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
      <View>
        {errorWithGroupID && (
          <Modal
            animationType="none"
            transparent={false}
            visible={errorWithGroupID}
            onRequestClose={() => {
              setErrorWithGroupID(!errorWithGroupID);
            }}
            style={{ height: 400, width: 400, backgroundColor: "#FF0000" }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: 300,
                width: 400,
              }}
            >
              <Text>You have written the wrong code</Text>
              <Button
                title="Close"
                onPress={() => setErrorWithGroupID(!errorWithGroupID)}
              />
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputField: {
    borderColor: "black",
    width: "80%",
    height: "10%",
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
  },
  textField_button: {
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    color: "#FDDA0D",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    elevation: 3,
    borderColor: "black",
    backgroundColor: "black",
    borderRadius: 10,
    margin: 10,
  },
});
