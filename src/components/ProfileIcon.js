// The Profile tab's icon, a head and shoulders drawn with two Views, so the
// tab bar needs no icon library.
import { View } from 'react-native';

// Props: color (the tab bar passes the active or inactive colour), size (24)

export default function ProfileIcon({ color, size = 24 }) {
  // An outer View, size x size, children centred horizontally, holding:
  // 1. the head: a circle size * 0.42 wide and high (borderRadius half of
  //    that), borderWidth 2 in `color`
  // 2. the shoulders: size * 0.8 wide, size * 0.4 high, marginTop 2, only the
  //    top corners rounded (size * 0.4), borderWidth 2 in `color` but
  //    borderBottomWidth 0

   const headSize = size * 0.42;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
      }}
    >
     
      <View
        style={{
          width: headSize,
          height: headSize,
          borderRadius: headSize / 2,
          borderWidth: 2,
          borderColor: color,
        }}
      />

     
      <View
        style={{
          width: size * 0.8,
          height: size * 0.4,
          marginTop: 2,
          borderTopLeftRadius: size * 0.4,
          borderTopRightRadius: size * 0.4,
          borderWidth: 2,
          borderColor: color,
          borderBottomWidth: 0,
        }}
      />
    </View>
  );
}
