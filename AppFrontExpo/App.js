import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/DrawerContent";
// import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme, ThemeProvider } from './themeContext';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <DrawerNavigator />
    </ThemeProvider>
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
