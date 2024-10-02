import React, { useState, useEffect } from "react";
import {View,Text,TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const ProfileScreen = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${process.env.API}/user/profile`);
      setUser(response.data);
    } catch (err) {
      console.error("Erreur profil:", err);
      setError("Errors.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`profile`, user);
      alert("Profil updated !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil:", err);
      alert("Erreur lors de la mise à jour du profil.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        keyboardType="email-address"
      />
      <Button title="Sauvegarder" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default ProfileScreen;
