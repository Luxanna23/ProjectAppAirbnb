import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';

const DrawerContent = (props) => {
    const navigation = useNavigation();
    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };
    return (
        <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigateToScreen('Register')}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigateToScreen('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
      backgroundColor: '#f0f0f0',
      padding: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    drawerItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  });

export default DrawerContent;
