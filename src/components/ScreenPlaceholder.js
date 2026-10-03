import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// TEMPORARY SCAFFOLDING - not part of the lab.
//
// A screen you have not built yet shows this instead of a blank page, so you
// can see that navigation works before any screen is finished. When you build
// a screen, delete its <ScreenPlaceholder /> line and this import; when every
// screen is done, delete this file too.
//
// It writes its own colours on purpose: COLORS in src/theme is empty until you
// fill it, and a placeholder must draw even then.
export default function ScreenPlaceholder({ name }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.tag}>NOT BUILT YET</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.hint}>
        The notes at the top of this screen's file say what goes here.
      </Text>

     
    </View>
  );
}

const styles = StyleSheet.create({
  // an opaque background: COLORS.white is undefined until you fill the theme,
  // and without one the screen under this one shows through mid-transition
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  tag: { fontSize: 12, letterSpacing: 1, color: '#9CA3AF', marginBottom: 8 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  hint: { marginTop: 8, textAlign: 'center', color: '#6B7280' },
  link: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 18, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8 },
  linkText: { color: '#2743FD', fontWeight: '600' },
});
