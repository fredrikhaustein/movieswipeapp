import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../firebaseConfig";
import { genreateGroupID } from "../utils/genreateGroupID";
import { useStoreGamePin, useStoreMovieFilters } from "../store/MovieFilter";
import { signInAnonymously } from "firebase/auth";
import { COLORS } from "../values/colors";
import { useFocusEffect } from "@react-navigation/native";

export const CreateGroup = ({ navigation }: any) => {
  const [pressedCreateNewGroup, setPressedCreateNewGroup] = useState(false);
  const [errorOnJoiningGroup, setErrorOnJoiningGroup] = useState<string>("");
  const [groupID, setGroupID] = useState<number>();

  const setGamePin = useStoreGamePin((state) => state.setGamePin);

  const selectedGenreList = useStoreMovieFilters((state) => state.genreList);
  const selectedMovieService = useStoreMovieFilters(
    (state) => state.streamingService
  );

  const handleNextPage = () => {
    navigation.navigate("SwipeScreen", { type: "anonymous" });
  };

  const handleSignIn = async () => {
    signInAnonymously(firebaseAuth).catch((error) => {
      setErrorOnJoiningGroup("Something went wrong while creating group");
      console.log(error.message);
    });
    console.log(firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null);
  };

  const handleAddUserToFireStore = async () => {
    console.log("handleAddUser", groupID);
    await updateDoc(doc(db, "Groups", `${groupID}`), {
      Users: arrayUnion(`${firebaseAuth.currentUser?.uid}`),
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleOnPressCreateGroup = async () => {
    const newgroupID = genreateGroupID();
    setGroupID(newgroupID);
    const allGroupIds: string[] = [];

    const querySnapshot = await getDocs(collection(db, "Groups"));
    querySnapshot.forEach((doc) => {
      allGroupIds.push(doc.id);
    });


    // Sjekke at gruppe ikke eksisterer
    // if (allGroupIds.includes(groupID!.toString())) {
    //   setGroupID(genreateGroupID());
    // }

    console.log("Dette er gruppeid", newgroupID);
    if (newgroupID) {
      await setDoc(doc(db, "Groups", `${newgroupID!.toString()}`), {
        MovieService: `${selectedMovieService}`,
        GenreList: selectedGenreList,
        Users: [],
        Likes: [],
        Dislikes: [], 
        Page: 1,
      });
      setPressedCreateNewGroup(true);
      setGamePin(newgroupID.toString());
    }
    handleSignIn();
    console.log(selectedGenreList);
    console.log(selectedMovieService);
  };

  const handleOnPressStart = () => {
    handleAddUserToFireStore();
    handleNextPage();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
      }}
    >
      {pressedCreateNewGroup ? (
        <View>
          <Text style={styles.textFieldStyle}>Your Group ID is:</Text>
          <Text style={styles.textFieldGroupStyle}>{groupID}</Text>
          <TouchableOpacity style={styles.button} onPress={handleOnPressStart}>
            <Text style={styles.textField_button}>Start</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleOnPressCreateGroup}
        >
          <Text style={styles.textField_button}>Create new group</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
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
  textFieldStyle: {
    fontSize: 25,
    margin: 10,
    textAlign: "center",
  },
  textFieldGroupStyle: {
    fontSize: 35,
    margin: 10,
    textAlign: "center",
  },
});
