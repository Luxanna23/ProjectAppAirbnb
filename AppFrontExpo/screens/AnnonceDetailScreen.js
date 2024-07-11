import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AnnonceDetailScreen = ({ route }) => {
  const { annonceId } = route.params;
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnonceDetail();
  }, []);

  const fetchAnnonceDetail = async () => {
    try {
      const response = await axios.get(`${process.env.API}/annonces/${annonceId}`);
      setAnnonce(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur annonce detail:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {annonce.images && annonce.images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={styles.image}
        />
      ))}
      <Text style={styles.title}>{annonce.Title}</Text>
      <Text style={styles.description}>{annonce.Description}</Text>
      <Text style={styles.price}>{annonce.Price_per_night}€</Text>
      <Button title="Reserver" onPress={() => alert('Reservation effectuée!')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AnnonceDetailScreen;