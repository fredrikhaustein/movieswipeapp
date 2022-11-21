import { CheckBox } from "@rneui/base";
import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const ChooseGenre = ({ navigation }: any) => {
  type GenreType = {
    id: string;
    genre: string;
    checked: boolean;
  };

  const [genre1, setGenre1] = useState<GenreType>({
    id: "Krim",
    genre: "Krim",
    checked: false,
  });
  const [genre2, setGenre2] = useState<GenreType>({
    id: "Action",
    genre: "Action",
    checked: false,
  });
  const [genre3, setGenre3] = useState<GenreType>({
    id: "Comedy",
    genre: "Comedy",
    checked: false,
  });
  const [genre4, setGenre4] = useState<GenreType>({
    id: "Sci-fi",
    genre: "Sci-fi",
    checked: false,
  });
  const [genre5, setGenre5] = useState<GenreType>({
    id: "Horror",
    genre: "Horror",
    checked: false,
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDDA0D",
      }}
    >
      <Text style={{ fontSize: 25 }}>Choose one streaming service</Text>
      <CheckBox
        center
        testID=""
        title={`${genre1!.id}`}
        checked={genre1!.checked}
        onPress={() =>
          setGenre1({
            id: genre1!.id,
            genre: genre1!.genre,
            checked: !genre1!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${genre2!.id}`}
        checked={genre2!.checked}
        onPress={() =>
          setGenre2({
            id: genre2!.id,
            genre: genre2!.genre,
            checked: !genre2!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${genre3?.id}`}
        checked={genre3!.checked}
        onPress={() =>
          setGenre3({
            id: genre3!.id,
            genre: genre3!.genre,
            checked: !genre3!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${genre4?.id}`}
        checked={genre4!.checked}
        onPress={() =>
          setGenre4({
            id: genre4!.id,
            genre: genre4!.genre,
            checked: !genre4!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${genre5?.id}`}
        checked={genre5!.checked}
        onPress={() =>
          setGenre5({
            id: genre5!.id,
            genre: genre5!.genre,
            checked: !genre5!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
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
