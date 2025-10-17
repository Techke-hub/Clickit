import React, { useState, useContext } from 'react';
import { View, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../App';

export default function Upload({ navigation }) {
  const [caption, setCaption] = useState('');
  const { token } = useContext(AuthContext);

  async function pickAndUpload() {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
    if (res.cancelled) return;
    const uri = res.uri;
    const filename = uri.split('/').pop();
    const form = new FormData();
    form.append('file', { uri, name: filename, type: 'video/mp4' });
    const uploadRes = await axios.post('http://10.0.2.2:4000/api/upload/media', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    const post = await axios.post('http://10.0.2.2:4000/api/posts', { caption, mediaUrl: uploadRes.data.url }, { headers: { Authorization: `Bearer ${token}` } });
    navigation.navigate('Feed');
  }

  return (
    <View>
      <TextInput value={caption} onChangeText={setCaption} placeholder="Caption" />
      <Button title="Pick video and upload" onPress={pickAndUpload} />
    </View>
  );
}
