// One line of red text under a form: "Incorrect email or password",
// "Passwords do not match", ...
import { Text } from 'react-native';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
} from '../theme';
// Props: message, testID
export default function FormError({ message, testID }) {
  // No message -> return null, so nothing is drawn.
  // Otherwise a Text with the message: COLORS.error, FONTS.primary,
  // FONT_WEIGHTS.medium, FONT_SIZES.small, centred, marginTop SPACING.small * 2.
    if (!message) return null;

  return (
    <Text
      testID={testID}
      style={{
        color: COLORS.error,
        fontFamily: FONTS.primary,
        fontWeight: FONT_WEIGHTS.medium,
        fontSize: FONT_SIZES.small,
        textAlign: 'center',
        marginTop: SPACING.small * 2,
      }}
    >
      {message}
    </Text>
  );
}
