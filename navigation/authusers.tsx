import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/LoginScreen";
import Signup from "../screens/Signupscreen";
import WelcomeScreen from "../screens/Welcome";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Sign In" component={Signup} />
        <Stack.Screen name="Sign Up" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
