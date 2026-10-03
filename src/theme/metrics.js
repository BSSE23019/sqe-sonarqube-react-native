// Sizes, radii, spacing and font sizes, in dp, taken from the Figma file.
// Screens use these names instead of typing numbers into their styles.
//
// RADIUS: corner radius of
//   input, button, social
//
// BORDER: border width of
//   input
//
// SIZES: fixed heights/widths of
//   inputHeight, buttonHeight, socialWidth, socialHeight
//
// SPACING: gaps
//   gutter   left and right edge of every screen
//   field    between two inputs
//   section  between blocks (title, form, buttons)
//   small    small gaps
//
// FONT_SIZES:
//   headline  Welcome screen headline
//   title     "Login here", "Create Account", ...
//   subtitle  the line under a title
//   button    button labels
//   body      inputs and placeholders
//   small     links and captions

// SAMPLE: one value in each group is filled in. Read the rest off the Figma
// frames -- select a layer, and Inspect gives you the number.


export const RADIUS = {
  input: 10,
  button: 10,
  social: 10,
};

export const BORDER = {
  input: 2,
};

export const SIZES = {
  inputHeight: 64,
  buttonHeight: 60,
  socialWidth: 60,
  socialHeight: 44,
};

export const SPACING = {
  gutter: 30,
  field: 29,
  section: 30,
  small: 30,
};

export const FONT_SIZES = {
  headline: 35,
  title: 30,
  subtitle: 20,
  button: 20,
  body: 16,
  small: 14,
};