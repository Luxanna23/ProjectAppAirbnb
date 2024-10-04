import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeStack from "./StackNavigator";
import ProfileScreen from '../screens/ProfileScreen';
import AnnonceDetailScreen from '../screens/AnnonceDetailScreen';
import { useTheme, ThemeProvider } from '../themeContext'; 
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import CustomDrawerContent from "../components/CustomDrawerContent"; 
import { Image } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { theme } = useTheme(); // pour recuperer le theme courant light ou dark

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator 
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />} 
        >
        <Drawer.Screen 
          name="Logo" 
          component={HomeStack} 
          options={{
            title:'',
            headerLeft: () => (
              <Image 
                source={theme === 'dark' 
                    ? require('../images/full_logo_light_theme.png') 
                    : require('../images/full_logo_dark_theme.png') 
                  }
                style={{ width: 40, height: 40, marginLeft: 15 }}
              />
            )
          }}
        />
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default DrawerNavigator;
