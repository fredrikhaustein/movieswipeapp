import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./screens/DetailScreen";
import Home from "./screens/Home";
import SwipeScreen from "./screens/Swipescreen";
import CreateNewGroup from "./screens/ChooseMovieService";
import ChooseGenre from "./screens/ChooseGenre";
import CreateGroup from "./screens/CreateGroup";
import WaitingScreen from "./screens/WaitingScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
        <Stack.Screen name="Waiting" component={WaitingScreen}/>
        <Stack.Screen
          name="CreateNewGroupScreen"
          component={CreateNewGroup}
          options={{
            headerShown: true,
            title: "Choose Movie Services",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#FDDA0D",
            },
          }}
        />
        <Stack.Screen
          name="ChooseGenre"
          component={ChooseGenre}
          options={{
            headerShown: true,
            title: "Choose Genre",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#FDDA0D",
            },
          }}
        />
        <Stack.Screen
          name="CreateGroup"
          component={CreateGroup}
          options={{
            headerShown: true,
            title: "",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#FDDA0D",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
