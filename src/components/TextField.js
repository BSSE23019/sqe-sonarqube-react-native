import { useState } from 'react';
import { TextInput } from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  SIZES,
  RADIUS,
  BORDER,
  FONT_SIZES,
} from '../theme';

// An input whose border turns primary while it has focus. Used for every
// field: email, password, confirm password, full name, date of birth.

// Props: style, onFocus, onBlur, and ...props: everything else (placeholder,
// value, onChangeText, secureTextEntry, keyboardType, testID, ...) goes
// straight through to the TextInput.
export default function TextField({ style, onFocus, onBlur, ...props }) {
  // 1. state: focused (true/false), starting false
  // 2. return a TextInput with:
  //      placeholderTextColor COLORS.textMuted
  //      {...props}
  //      onFocus: set focused true, then call the onFocus prop if one was given
  //      onBlur:  set focused false, then call the onBlur prop if one was given
  // 3. style:
  //      height SIZES.inputHeight, borderRadius RADIUS.input,
  //      borderWidth BORDER.input, borderColor COLORS.border,
  //      backgroundColor COLORS.inputBg, paddingHorizontal 20,
  //      COLORS.text, FONTS.primary, FONT_WEIGHTS.medium, FONT_SIZES.body
  //    while focused, also borderColor COLORS.borderFocus; then `style`.

  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholderTextColor={COLORS.textMuted}
      {...props}
      onFocus={() => {setFocused(true) ; 
         onFocus?.();
      } }
     
      onBlur={() => {setFocused(false)
        onBlur?.();
      }}
       style={[
        {
          height: SIZES.inputHeight,
          borderRadius: RADIUS.input,
          borderWidth: BORDER.input,
          borderColor: focused ? COLORS.borderFocus : COLORS.border,
          backgroundColor: COLORS.inputBg,
          paddingHorizontal: 20,
          color: COLORS.text,
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: FONT_SIZES.body,
        },
        style,
      ]}
    />
  );
}
