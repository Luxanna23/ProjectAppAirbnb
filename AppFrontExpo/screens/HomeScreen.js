import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      />
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  button: {
    marginVertical: 8,
    width: '80%',
  },
});
export default HomeScreen;