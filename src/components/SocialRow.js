// "Or continue with" and the Google, Facebook and Apple tiles, under the Login
// and Sign Up forms. The tiles do nothing yet.

// Each exported PNG is the whole tile (grey rounded square and logo), so it is
// drawn at tile size with no extra background.

import { View, Text, Pressable, Image } from 'react-native';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SIZES,
  RADIUS,
  SPACING,
} from '../theme';
import { IMAGES } from '../assets';
export const PROVIDERS = [
  // { id: 'google', icon: require('../assets/images/google.png') },
  // ... facebook and apple the same way

  {
    id: 'google',
    icon: IMAGES.google,
  },
  {
    id: 'facebook',
    icon: IMAGES.facebook,
  },
  {
    id: 'apple',
    icon: IMAGES.apple,
  },

];

// Props: onPress (optional), called with the provider's id
export default function SocialRow({ onPress }) {
  // A View, centred, marginTop SPACING.section, holding:
  // 1. Text "Or continue with": COLORS.primary, FONTS.primary,
  //    FONT_WEIGHTS.semiBold, FONT_SIZES.small
  // 2. a row (flexDirection 'row', gap SPACING.small) with one Pressable per
  //    PROVIDERS entry (map; key and testID `social-${id}`), each holding an
  //    Image of the icon at SIZES.socialWidth x SIZES.socialHeight
  //    (borderRadius RADIUS.social, resizeMode "contain"); opacity 0.7
  //    while pressed
  return(
   <View
      style={{
        alignItems: 'center',
        marginTop: SPACING.section,
      }}
    >
      <Text
        style={{
          color: COLORS.primary,
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.semiBold,
          fontSize: FONT_SIZES.small,
        }}
      >
        Or continue with
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: SPACING.small,
        }}
      >
        {PROVIDERS.map(provider => (
          <Pressable
            key={provider.id}
            testID={`social-${provider.id}`}
            onPress={() => onPress?.(provider.id)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Image
              source={provider.icon}
              style={{
                width: SIZES.socialWidth,
                height: SIZES.socialHeight,
                borderRadius: RADIUS.social,
              }}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
