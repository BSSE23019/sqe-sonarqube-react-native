// A round avatar with the user's initials; it stands in for the profile photo.
// Used on Profile and on Update Profile.

// Initials from a user object:
//   name "Ali Khan"          -> "AK"
//   name "ali"               -> "A"
//   no name, email "sara@.." -> "S"
//   neither                  -> "?"

import { View, Text } from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
} from '../theme';
export function initials(user) {
  // 1. split the name into words (trim first, and drop empty words)
  // 2. if there are words: the first letter of the first two, upper-case
  // 3. otherwise the first letter of the email, upper-case, or '?'
  
  if (user.name && user.name.trim()) {
    const name = user.name.trim().split(' ');

    if (name.length >= 2) {
      return (
        name[0][0].toUpperCase() +
        name[1][0].toUpperCase()
      );
    }

    return name[0][0].toUpperCase();
  }

  if (user.email) {
    return user.email[0].toUpperCase();
  }

  return '?';
}
 


// Props: user, size (default 110), testID
export default function Avatar({ user, size = 110, testID }) {
  // A View, width and height `size`, borderRadius size / 2 (a circle),
  // COLORS.primary background, borderWidth 4 in COLORS.primaryShadow,
  // content centred, holding a Text with initials(user):
  // COLORS.white, FONTS.primary, FONT_WEIGHTS.semiBold, fontSize size * 0.36

   return (
    <View
      testID={testID}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: COLORS.primary,
        borderWidth: 4,
        borderColor: COLORS.primaryShadow,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.semiBold,
          fontSize: size * 0.36,
        }}
      >
        {initials(user)}
      </Text>
    </View>
  );
}
