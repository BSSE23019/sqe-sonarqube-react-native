// A text-only button, the same size as PrimaryButton: Register on Welcome, and
// the links "Create new account", "Already have an account", "Back to login",
// "Log out" and "Cancel".
import { Pressable, Text } from 'react-native';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  RADIUS,
  SIZES,
  FONT_SIZES,
} from '../theme';
// Props: title, onPress, style, textStyle (to change the text's colour or
// size for a link), testID
export default function SecondaryButton({ title, onPress, style, textStyle, testID }) {
  // Return a Pressable holding a Text with `title`.
  //
  // Pressable: height SIZES.buttonHeight, borderRadius RADIUS.button, content
  //   centred, no background; opacity 0.6 while pressed; then `style`.
  //
  // Text: COLORS.text, FONTS.primary, FONT_WEIGHTS.semiBold, FONT_SIZES.button,
  //   then `textStyle`.
  
   return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: SIZES.buttonHeight,
          borderRadius: RADIUS.button,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: COLORS.text,
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.semiBold,
            fontSize: FONT_SIZES.button,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
