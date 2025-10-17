import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../App';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);

  async function doLogin() {
    const res = await axios.post('http://10.0.2.2:4000/api/auth/login', { email, password });
    setToken(res.data.token);
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={doLogin} />
    </View>
  );
}
