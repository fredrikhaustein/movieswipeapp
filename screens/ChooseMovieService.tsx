import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import { useStoreMovieFilters } from "../store/MovieFilter";
import { streamingServiceList } from "../utils/movieSelectionList";
import { COLORS } from "../values/colors";

export const ChooseMovieService = ({ navigation }: any) => {
  const streamingService = useStoreMovieFilters(
    (state) => state.streamingService
  );
  const setStreamingService = useStoreMovieFilters(
    (state) => state.setStreamingService
  );

  const [checkedState, setCheckedState] = useState(
    new Array(streamingServiceList.length).fill(false)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? true : false
    );
    setCheckedState(updatedCheckedState);
    setStreamingService(streamingServiceList[position].apiKey);
  };

  console.log(streamingService);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ fontSize: 25 }}>Choose ONE streaming service</Text>
      {streamingServiceList.map(({ id, service }, index) => {
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
        onPress={() => navigation.navigate("ChooseGenre")}
      >
        <Text style={styles.textField_button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseMovieService;

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
