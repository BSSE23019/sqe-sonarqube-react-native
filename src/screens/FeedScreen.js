import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_WEIGHTS, RADIUS, SPACING } from '../theme';
import { IMAGES } from '../assets';
import TextField from '../components/TextField';
import { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { getPosts, addPost, toggleLike, deletePost } from '../lib/postStore';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/Avatar';

export default function Feed() {
  const [text, setText] = useState('');
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      const savedPosts = await getPosts();
      setPosts(sortPosts(savedPosts));
    };

    loadPost();
  }, []);

  const handlePosts = async function () {
    if (!text.trim()) {
      setError('Please type something !!');
      return;
    }
    setError('');
    await addPost(user.email, text.trim());

    const updatedPosts = await getPosts();
    setPosts(updatedPosts);

    setText('');
  };

  function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return 'Just now';

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365);
    return `${years}y ago`;
  }
  const handleLike = async postId => {
    await toggleLike(postId, user.email);

    const updatedPosts = await getPosts();
    setPosts(updatedPosts);
  };

  const handleDelete = async postId => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(postId, user.email);

            const updatedPosts = await getPosts();
            setPosts(updatedPosts);
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const displayLikes = item => {
    const count = item.likes?.length || 0;
    const isLiked = item.likes?.includes(user.email);

    const countText = `${count} ${count === 1 ? 'like' : 'likes'}`;
    const statusText = isLiked ? 'Liked' : 'Like';

    return `${countText} · ${statusText}`;
  };
  const sortPosts = (posts) => {
  return [...posts].sort((a, b) => b.createdAt - a.createdAt);
};

  return (
    <ImageBackground
      source={IMAGES.bg}
      testID="feed-screen"
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: SPACING.gutter,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            data={posts}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View style={styles.feedScreen}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: FONT_WEIGHTS.bold,
                    fontSize: 30,
                  }}
                >
                  FEED
                </Text>

                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    width: '100%',
                  }}
                >
                  <TextField
                    testID="feed-input"
                    style={styles.feedInput}
                    placeholder="What's on your mind?"
                    multiline
                    maxLength={280}
                    value={text}
                    onChangeText={setText}
                  />
                  {error ? (
                    <Text testID="feed-error" style={styles.feedError}>
                      {error}
                    </Text>
                  ) : null}

                  <Text testID="feed-count" style={styles.feedCount}>
                    {text.length}/280
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    width: '100%',
                  }}
                >
                  <PrimaryButton
                    testID="feed-post"
                    style={styles.feedPost}
                    title="POST"
                    onPress={handlePosts}
                  />
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <View testID={`post-${item.id}`} style={styles.postCard}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Avatar user={user} size={42} />
                  <View>
                    <Text
                      style={{
                        paddingRight: 20,
                        paddingLeft: 20,
                        paddingTop: 10,
                        fontWeight: FONT_WEIGHTS.bold,
                      }}
                    >
                      {user.name}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 20,
                        paddingTop: 5,
                      }}
                    >
                      {formatTimeAgo(item.createdAt)}
                    </Text>
                  </View>
                </View>
                <Text testID="post-text" style={styles.postText}>
                  {item.text}
                </Text>

                <View style={styles.postActions}>
                  <Pressable
                    testID={`post-like-${item.id}`}
                    onPress={() => handleLike(item.id)}
                    style={styles.actionButton}
                  >
                    <Text  testID={`post-likes-${item.id}`} style={styles.postLike}>{displayLikes(item)}</Text>
                  </Pressable>
                  {item.authorEmail === user.email && (
                    <Pressable
                      testID={`post-delete-${item.id}`}
                      onPress={() => handleDelete(item.id)}
                      style={styles.actionButton}
                    >
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={<Text testID="feed-empty">No posts yet.</Text>}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  feedScreen: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  feedInput: {
    height: 120,
    textAlignVertical: 'top',
    color: '#000000',
    backgroundColor: '#F1F4FF',
    borderRadius: RADIUS.input,
    padding: 12,
  },
  feedError: {
    color: COLORS.error,
    fontSize: 14,
  },
  feedCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: COLORS.textMuted,
  },
  feedPost: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.text,
    fontWeight: FONT_WEIGHTS.bold,
  },
  postCard: {
    padding: 16,
    marginHorizontal: 4,
    marginBottom: 12,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.inputBg,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E6E9F5',
  },

  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  postLike: {
    fontSize: 14,
    color: '#626262',
    fontWeight: '600',
  },

  deleteText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '600',
  },
  postName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#626262',
  },
});
