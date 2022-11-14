import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>

      <View style={styles.buttons}>
        <Button
          title="Sign in"
          onPress={() => navigation.navigate("Sign In")}
        />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("Sign Up")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    flex: 1,
  },

  button: {
    marginTop: 10,
  },
});

export default WelcomeScreen;
