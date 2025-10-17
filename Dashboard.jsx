import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/posts/feed').then(r => setPosts(r.data));
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ClickIt Admin</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {posts.map(p => (
          <div key={p.id} className="border rounded p-2">
            <video src={p.mediaUrl} controls className="w-full h-48 object-cover" />
            <div className="mt-2">{p.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
