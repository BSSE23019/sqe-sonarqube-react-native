// The app uses Poppins. The Android side is already set up for you:
//   android/app/src/main/res/font/poppins.xml maps weights 400/500/600/700 to
//   the Poppins .ttf files, and MainApplication.kt registers it as 'Poppins'.
//
// So a style picks the font the way Figma writes it:
//   { fontFamily: FONTS.primary, fontWeight: FONT_WEIGHTS.semiBold }
//
// FONTS will hold:
//   primary      the family name registered in MainApplication ('Poppins')
//
// FONT_WEIGHTS will hold (as strings):
//   regular '400', medium '500', semiBold '600', bold '700'
//
// Only those four weights are bundled; Figma uses Bold for headings and
// SemiBold for subheadings, buttons and links.

// SAMPLE: primary is filled in, because the Android side already registers
// the family under this exact name. Add the four weights yourself.
export const FONTS = {
  primary: 'Poppins',
};

export const FONT_WEIGHTS = {
   // SAMPLE
    regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',

  // TODO: regular '400', medium '500', bold '700'
};
