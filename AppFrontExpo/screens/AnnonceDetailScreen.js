import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';

const AnnonceDetailScreen = ({ route, navigation }) => {
  const { annonceId } = route.params;
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnonceDetails();
  }, []);

  const fetchAnnonceDetails = async () => {
    try {
      const response = await axios.get(`${process.env.API}/api/annonces/${annonceId}`);
      setAnnonce(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur annonce:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!annonce) {
    return (
      <View style={styles.container}>
        <Text>Annonce not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: annonce.imageUrl[0] }} 
        style={styles.image}
      />
      <Text style={styles.title}>{annonce.title}</Text>
      <Text style={styles.description}>{annonce.description}</Text>
      <Text style={styles.price}>{annonce.Price_per_night}€ per night</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AnnonceDetailScreen;