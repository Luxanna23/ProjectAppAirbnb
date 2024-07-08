import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../AppFrontExpo/screens/RegisterScreen';
import LoginScreen from '../AppFrontExpo/screens/LoginScreen';
import HomeScreen from '../AppFrontExpo/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => setAnnonces(data))
      .catch(error => console.error('Error fetching annonces:', error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text>{item.Description}</Text>
      <Text>Adresse: {item.Adresse}</Text>
      <Text>Prix par nuit: {item.Price_per_night}</Text>
    </View>
  );

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={annonces}
    //     renderItem={renderItem}
    //     keyExtractor={item => item._id}
    //   />
    // </View>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});