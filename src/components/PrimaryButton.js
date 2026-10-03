// The filled blue button: Login, Sign in, Sign up, Save, Update Profile.
import { Pressable, Text } from 'react-native';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  RADIUS,
  SIZES,
  FONT_SIZES,
} from '../theme';
// Props: title, onPress, style (extra style, e.g. a margin), testID
export default function PrimaryButton({ title, onPress, style, testID }) {
  // Return a Pressable (pass testID and onPress) holding a Text with `title`.
  //
  // Pressable style, as a function of { pressed }:
  //   height SIZES.buttonHeight, borderRadius RADIUS.button,
  //   backgroundColor COLORS.primary, content centred both ways,
  //   the shadow: shadowColor COLORS.primaryShadow, offset 0/10, opacity 1,
  //   radius 20, and elevation 8 for Android,
  //   opacity 0.85 while pressed, then `style` last so a screen can add to it.
  //
  // Text: COLORS.white, FONTS.primary, FONT_WEIGHTS.semiBold, FONT_SIZES.button

  return (<Pressable
    testID={testID}
    onPress={onPress}
    style={({ pressed }) => [
      {
        height: SIZES.buttonHeight,
        borderRadius: RADIUS.button,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: COLORS.primaryShadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,

        elevation: 8,

        opacity: pressed ? 0.85 : 1,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.white,
        fontFamily: FONTS.primary,
        fontWeight: FONT_WEIGHTS.semiBold,
        fontSize: FONT_SIZES.button,
      }}
    >
      {title}
    </Text>
  </Pressable>);
}
