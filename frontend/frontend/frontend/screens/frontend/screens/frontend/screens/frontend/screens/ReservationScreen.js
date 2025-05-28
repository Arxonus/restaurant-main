import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

export default function ReservationScreen({ route, navigation }) {
  const { restaurant, token } = route.params;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');

  async function handleReservation() {
    try {
      await axios.post('http://localhost:4000/api/bookings', {
        restaurant_id: restaurant.restaurant_id,
        date,
        time,
        people_count: people
      }, { headers: { Authorization: `Bearer ${token}` } });
      Alert.alert('Επιτυχία', 'Η κράτηση έγινε!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Σφάλμα', 'Προσπαθήστε ξανά');
    }
  }

  return (
    <View>
      <Text>Κράτηση για το {restaurant.name}</Text>
      <TextInput placeholder="Ημερομηνία (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextInput placeholder="Ώρα (HH:MM:SS)" value={time} onChangeText={setTime} />
      <TextInput placeholder="Άτομα" value={people} onChangeText={setPeople} keyboardType="numeric" />
      <Button title="Κράτηση" onPress={handleReservation} />
    </View>
  );
}
