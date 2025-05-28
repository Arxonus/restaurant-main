import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';

export default function RestaurantsScreen({ navigation, route }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const token = route.params?.token;

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
   const res = await axios.get('http://localhost:4000/api/restaurants');
    setRestaurants(res.data);
  }

  function filteredRestaurants() {
    return restaurants.filter(r => 
      r.name.toLowerCase().includes(search.toLowerCase()) || 
      r.location.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <View>
      <TextInput placeholder="Αναζήτηση" value={search} onChangeText={setSearch} />
      <FlatList
        data={filteredRestaurants()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.location}</Text>
            <Button title="Κράτηση" onPress={() => navigation.navigate('Reservation', { restaurant: item, token })} />
          </View>
        )}
        keyExtractor={item => item.restaurant_id.toString()}
      />
      <Button title="Το προφίλ μου" onPress={() => navigation.navigate('Profile', { token })} />
    </View>
  );
}
