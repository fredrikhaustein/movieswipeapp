import { CheckBox } from "@rneui/base";
import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStoreMovieFilters } from "../store/MovieFilter";
import { genreList, genreListSingular } from "../utils/genreSelectionList";

export const ChooseGenre = ({ navigation }: any) => {
  const [checkedState, setCheckedState] = useState(
    new Array(genreList.length).fill(false)
  );

  const setGenre = useStoreMovieFilters((state) => state.setGenreList);

  const handleOnChange = (position: number) => {
    const updatedCheckedState: boolean[] = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const newListGenre: string[] = [];
    updatedCheckedState.map((item, index) => {
      if (item) {
        newListGenre.push(genreListSingular[index]);
      }
    });
    console.log(newListGenre);
    setGenre(newListGenre);
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
      <Text style={{ fontSize: 25 }}>Choose Genre</Text>

      {genreList.map(({ id, service }, index) => {
        return (
          <CheckBox
            center
            key={`${id}`}
            title={`${service}`}
            checked={checkedState[index]}
            onPress={() => handleOnChange(index)}
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkboxTextStyle}
            wrapperStyle={styles.checkboxWrapper}
          />
        );
      })}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateGroup")}
      >
        <Text style={styles.textField_button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseGenre;

const styles = StyleSheet.create({
  checkboxStyle: {
    margin: 15,
    backgroundColor: "#FDDA0D",
    width: 250,
  },
  checkboxTextStyle: {
    fontSize: 20,
  },
  checkboxWrapper: {
    alignSelf: "flex-start",
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
