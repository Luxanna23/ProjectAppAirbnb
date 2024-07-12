import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AnnonceDetailScreen from '../screens/AnnonceDetailScreen';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AnnonceDetail" component={AnnonceDetailScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
