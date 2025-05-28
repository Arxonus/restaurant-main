import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      await axios.post('http://localhost:4000/api/users/register', { name, email, password });
      Alert.alert('Επιτυχία', 'Εγγραφήκατε επιτυχώς!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Σφάλμα', 'Το email χρησιμοποιείται ήδη');
    }
  }

  return (
    <View>
      <TextInput placeholder="Όνομα" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Κωδικός" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Εγγραφή" onPress={handleRegister} />
    </View>
  );
}
