import { View, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_WEIGHTS } from '../theme';
import {IMAGES} from '../assets'

export default function FeedIcon({ color }) {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.feedIcon}
        resizeMode="contain"
        style={[styles.icon]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
  },
});