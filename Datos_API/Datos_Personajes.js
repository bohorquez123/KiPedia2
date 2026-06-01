import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';

export default function DragonBallApp() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://dragonball-api.com/api/characters');
        const json = await response.json();

        // La API devuelve los personajes en la propiedad items
        setCharacters(json.items || []);
      } catch (error) {
        console.error('Error cargando personajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#FF9900"
        style={styles.loader}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes de Dragon Ball</Text>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.ki}>Ki: {item.ki}</Text>
              <Text numberOfLines={2} style={styles.race}>
                {item.race} - {item.gender}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 100,
    resizeMode: 'contain',
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  ki: {
    fontSize: 14,
    color: '#FF9900',
    marginVertical: 2,
  },
  race: {
    fontSize: 12,
    color: '#AAA',
  },
});