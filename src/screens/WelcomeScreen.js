import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { IMAGES } from '../assets';
import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
  SIZES,
} from '../theme';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

// WELCOME SCREEN: the first screen of the app (logged-out users).
//
// This one is PART-BUILT as the worked example. The cover and the headline are
// done, and they show the two rules the rest of the lab follows:
//
//   1. an image comes from IMAGES (src/assets/index.js), never from a path
//      typed into a screen
//   2. a colour, size or spacing comes from the theme, never as a number here
//
// Every value used below is already in src/theme -- they are the SAMPLE
// entries. Fill in the rest from Figma as the screens need them.
//
// Still to build here:
//   - the background image (IMAGES.bg) filling the whole screen, running up
//     behind the status bar
//   - subtitle "Explore all the existing job roles based or your interest and
//     study major"                                     SemiBold, centred
//   - two buttons side by side:
//       Login     (filled, primary)  -> navigation.navigate('Login')
//       Register  (text only)        -> navigation.navigate('SignUp')
//
// Props: { navigation } from the stack navigator.
// Styles: only values from '../theme'.

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      testID="welcome-screen"
      source={IMAGES.bg}
      resizeMode="cover"
      style={styles.screen}
    >
      <View style={styles.screen}>
        {/* welcome.png is a placeholder until you save the Figma export over it */}
        <Image
          source={IMAGES.welcome}
          style={styles.cover}
          resizeMode="contain"
        />

        {/* TODO: the subtitle and the two buttons go here */}
        <View>
          <Text style={styles.headline}>Discover your Dream Job here</Text>
          <Text style={styles.subtitle}>
            Explore all the existing job roles based or your interest and study
            major
          </Text>
          <View style={styles.buttons}>
            <PrimaryButton
              testID="welcome-login"
              title="Login"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            />

            <SecondaryButton
              testID="welcome-register"
              title="Register"
              onPress={() => navigation.navigate('SignUp')}
              style={styles.registerButton}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.gutter, // 30, read from the theme
  },
  cover: {
    width: '100%',
    height: undefined,
    aspectRatio: 385 / 422, // the frame's own ratio, so it never squashes
  },
  headline: {
    marginTop: SPACING.gutter,
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: FONT_SIZES.headline,
  },

  subtitle: {
    marginTop: SPACING.small,
    textAlign: 'center',
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.regular,
    fontSize: FONT_SIZES.small,
  },

  buttons: {
    width: 350,
    height: SIZES.buttonHeight,
    flexDirection: 'row',
    gap: SPACING.small,
    marginTop: SPACING.section,
  },

  loginButton: {
    width: 160,
  },

  registerButton: {
    width: 160,
  },
});
