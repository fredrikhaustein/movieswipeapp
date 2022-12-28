import { CheckBox } from "@rneui/base";
import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useStoreMovieFilters } from "../store/MovieFilter";
import { genreList, genreListSingular } from "../utils/genreSelectionList";
import { COLORS } from "../values/colors";

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
        newListGenre.push(genreList[index].apiKey);
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
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ fontSize: 25 }}>Choose Genre</Text>
      <ScrollView>
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
      </ScrollView>
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
    backgroundColor: COLORS.background,
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
