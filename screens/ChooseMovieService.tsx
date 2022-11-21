import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox } from "@rneui/themed";
import React, { Dispatch, SetStateAction, useState } from "react";

export const ChooseMovieService = ({ navigation }: any) => {
  const [checked1, setCheck1] = useState<StreamingServiceType>({
    id: "Disney",
    service: "Disney",
    checked: false,
  });
  const [checked2, setCheck2] = useState<StreamingServiceType>({
    id: "Netflix",
    service: "Netflix",
    checked: false,
  });
  const [checked3, setCheck3] = useState<StreamingServiceType>({
    id: "Prime",
    service: "Prime",
    checked: false,
  });
  const [checked4, setCheck4] = useState<StreamingServiceType>({
    id: "HBO",
    service: "HBO",
    checked: false,
  });
  const [checked5, setCheck5] = useState<StreamingServiceType>({
    id: "AppleTV",
    service: "AppleTV",
    checked: false,
  });

  type StreamingServiceType = {
    id: string;
    service: string;
    checked: boolean;
    // setCheck: Dispatch<SetStateAction<boolean>>;
  };

  //   const streamingServices: StreamingServiceType[] = [
  //     {
  //       id: "Disney",
  //       service: "Disney",
  //       checked: false,
  //       setCheck: () => ,
  //     },
  //     {
  //       id: "Netflix",
  //       service: "Netflix",
  //       checked: false,
  //       setCheck: () => !checked,
  //     },
  //     {
  //       id: "Prime",
  //       service: "Prime",
  //       checked: false,
  //       setCheck: () => !checked,
  //     },
  //     {
  //       id: "HBO",
  //       service: "HBO",
  //       checked: false,
  //       setCheck: () => !checked,
  //     },
  //     {
  //       id: "AppleTV",
  //       service: "AppleTV",
  //       checked: false,
  //       setCheck: () => !checked,
  //     },
  //   ];

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDDA0D",
      }}
    >
      {/* {streamingServices.map((value) => (
        <CheckBox
          center
          testID=""
          title={`${value.service}`}
          checked={value.checked}
          onPress={() => value.setCheck()}
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkboxTextStyle}
          wrapperStyle={styles.checkboxWrapper}
        />
      ))} */}
      <Text style={{ fontSize: 25 }}>Choose one streaming service</Text>
      <CheckBox
        center
        testID=""
        title={`${checked1!.service}`}
        checked={checked1!.checked}
        onPress={() =>
          setCheck1({
            id: checked1!.id,
            service: checked1!.service,
            checked: !checked1!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${checked2!.service}`}
        checked={checked2!.checked}
        onPress={() =>
          setCheck2({
            id: checked2!.id,
            service: checked2!.service,
            checked: !checked2!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${checked3?.service}`}
        checked={checked3!.checked}
        onPress={() =>
          setCheck3({
            id: checked3!.id,
            service: checked3!.id,
            checked: !checked3!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${checked4?.service}`}
        checked={checked4!.checked}
        onPress={() =>
          setCheck4({
            id: checked4!.id,
            service: checked4!.service,
            checked: !checked4!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
      <CheckBox
        center
        testID=""
        title={`${checked5?.service}`}
        checked={checked5!.checked}
        onPress={() =>
          setCheck5({
            id: checked5!.id,
            service: checked5!.id,
            checked: !checked5!.checked,
          })
        }
        containerStyle={styles.checkboxStyle}
        textStyle={styles.checkboxTextStyle}
        wrapperStyle={styles.checkboxWrapper}
      />
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
