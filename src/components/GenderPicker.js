// Gender on Update Profile: two options side by side, Male and Female.
import { Pressable, View, Text } from 'react-native';
import { COLORS, FONTS, FONT_WEIGHTS, SPACING, SIZES, RADIUS, BORDER,FONT_SIZES } from '../theme';
export const GENDERS = ['Male', 'Female'];

// Props: value (the chosen gender, or ''), onChange (called with the new one)
export default function GenderPicker({ value, onChange }) {
  // A row (flexDirection 'row', gap SPACING.small) with one Pressable per
  // GENDERS entry (map; key the gender, testID `gender-male` / `gender-female`,
  // accessibilityRole "radio"), pressing it calls onChange(gender).
  //
  // Each option looks like an input: flex 1, height SIZES.inputHeight,
  // borderRadius RADIUS.input, borderWidth BORDER.input, COLORS.inputBg,
  // text centred in COLORS.textMuted, FONT_WEIGHTS.medium, FONT_SIZES.body.
  //
  // The selected one (value === gender) is filled with COLORS.primary and its
  // text is COLORS.white, FONT_WEIGHTS.semiBold.
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: SPACING.small,
      }}
    >
      {GENDERS.map(gender => {
        const selected = value === gender;
        return (<Pressable
          key={gender}
          testID={`gender-${gender.toLowerCase()}`}
          accessibilityRole="radio"
          onPress={() => onChange(gender)}
          style={{
            flex: 1,
            height: SIZES.inputHeight,
            borderRadius: RADIUS.input,
            borderWidth: BORDER.input,
            backgroundColor: selected ? COLORS.primary : COLORS.inputBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
              style={{
                color: selected ? COLORS.white : COLORS.textMuted,
                fontWeight: selected
                  ? FONT_WEIGHTS.semiBold
                  : FONT_WEIGHTS.medium,
                fontSize: FONT_SIZES.body,
              }}
            >
              {gender}
              </Text>
        </Pressable>);
      })}
    </View>
  );
}
