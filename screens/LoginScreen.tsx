import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import signupscreen from "./Signupscreen";

const Login = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <KeyboardAvoidingView style={logingstyles.container} behavior="padding">
      <View style={logingstyles.inputcontainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
          style={logingstyles.textstyle}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
          style={logingstyles.textstyle}
          secureTextEntry
        />
      </View>
      <View style={logingstyles.buttonContainer}>
        <Button title="Sign in" onPress={() => navigation.navigate("Signup")} />
        <Button title="Register" />
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;

const logingstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputcontainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textstyle: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    margin: 5,
    width: 200,
    height: 40,
    textAlign: "center",
    backgroundColor: "white",
  },
  buttonContainer: {},
});
