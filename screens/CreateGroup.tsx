import React from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { genreateGroupID } from "../utils/genreateGroupID";

export const CreateGroup = ({ navigation }: any) => {
  const handleOnCreateGroup = async () => {
    const digit = genreateGroupID();
    await setDoc(doc(db, "Groups", `${digit.toString()}`), {
      groupID: `${digit.toString()}`,
    });
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
      <TouchableOpacity style={styles.button} onPress={handleOnCreateGroup}>
        <Text style={styles.textField_button}>Create new group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
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
