import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import { AuthContext } from '../../App';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://10.0.2.2:4000/api/posts/feed').then(r => setPosts(r.data));
  }, []);

  return (
    <FlatList
      data={posts}
      pagingEnabled
      renderItem={({ item }) => (
        <View style={{ height: Dimensions.get('window').height }}>
          <Video
            source={{ uri: item.mediaUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls={false}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}
      keyExtractor={(i) => String(i.id)}
    />
  );
}
