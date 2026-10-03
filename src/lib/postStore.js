import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

export async function getPosts() {
  const json = await AsyncStorage.getItem('posts');
  if (!json) return [];
  return JSON.parse(json);
}
export async function savePosts(posts) {
  const savedPosts = JSON.stringify(posts);
  return await AsyncStorage.setItem('posts', savedPosts);
}

export async function addPost(authorEmail, text) {
  const p = await getPosts();
  const newPost = {
    authorEmail: authorEmail,
    text: text,
    likes: [],
    createdAt: Date.now(),
    id: Date.now() + '-' + Math.random().toString(36).slice(2, 6),
  };
  const updatedPosts = [...p, newPost];
  await savePosts(updatedPosts);
  return updatedPosts;
}
export async function toggleLike(postId, email) {
  const posts = await getPosts();
  const p = posts.find(p => p.id === postId);
  if (!p) return;
  if (!p.likes) p.likes=[];
  const emailExists = p.likes.find(e => e === email);

  if (!emailExists) {
    p.likes = [...p.likes, email];
  } else {
    p.likes = p.likes.filter(e => e !== email);
  }
   
  await savePosts(posts);
}
export async function deletePost(postId, email) {
  const posts = await getPosts();
  const p = posts.find(p => 
    p.id === postId
  );
  if (!p) return;
  
  if (p.authorEmail !== email) {
    throw new Error("Sorry! You can't delete a post you didn't create.");
  }

  const updatedPosts = posts.filter(e => e.id !== postId);
  
 
  await savePosts(updatedPosts);
}
