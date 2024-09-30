import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TextInput, Button, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";


const getBackendUrl = () => {
  const debuggerHost = Constants.expoConfig.hostUri;
  const ip = debuggerHost.split(':')[0];
  return `http://${ip}:3000`;
};

const { width } = Dimensions.get('window');
const HomeScreen = ({ navigation }) => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAnnonces();
  }, []);
  const fetchAnnonces = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/`);
      console.log(response.data);
      setAnnonces(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur annonces:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.annonceContainer}
      onPress={() => navigation.navigate('AnnonceDetail', { annonceId: item._id })}
    >
      <Image 
        source={{ uri: `${item.imageUrl}` }} 
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.description}>{item.Description}</Text>
        <Text style={styles.price}>{item.Price_per_night}€</Text>
      </View>
    </TouchableOpacity>
  );

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchAnnonces();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search..." />
      <View style={styles.filtersContainer}>
        <Button title="Filtres" onPress={() => {}} />
        <Button title="+" onPress={() => {}} />
      </View>
      <FlatList
        data={annonces}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <Text>Loading...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  annonceContainer: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8
  },
  image: {
    width: width - 32,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  textContainer: {
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;