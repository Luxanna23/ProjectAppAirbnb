import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";

const HomeScreen = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await axios.get(`${process.env.API}`);
      console.log(process.env.API);
      console.log(response.data);
      setAnnonces(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur annonces:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.annonceContainer}>
      <View style={styles.imagePlaceholder}>
        <Text>Images</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchAnnonces();
  };

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
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  annonceContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
