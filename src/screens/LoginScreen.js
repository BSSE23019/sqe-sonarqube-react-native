import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ScreenBackground from '../components/ScreenBackground';
import TextField from '../components/TextField';
import FormError from '../components/FormError';
import PrimaryButton from '../components/PrimaryButton';
import SocialRow from '../components/SocialRow';

import { useAuth } from '../context/AuthContext';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
} from '../theme';
// LOGIN SCREEN
//
// It will hold:
//   - the background image, as on every screen
//   - title "Login here"                          Bold 30, primary, centred
//   - subtitle "Welcome back you've been missed!" SemiBold 20, centred
//   - state: email, password, error
//   - Email input and Password input (secureTextEntry); the border turns
//     primary while an input is focused
//   - "Forgot your password?" (right aligned)
//         -> navigation.navigate('ForgotPassword')
//   - an error message in red when login fails
//   - "Sign in" button:
//       1. empty email or password -> show "Enter your email and password"
//       2. read the users JSON from AsyncStorage and find a user with the
//          same email (lower-case, trimmed) and password
//       3. not found -> show "Incorrect email or password"
//       4. found -> save them as the logged-in user; the app then shows the
//          dashboard (no navigate call needed)
//   - "Create new account" link -> navigation.navigate('SignUp')
//   - "Or continue with" and the Google / Facebook / Apple images
//     (src/assets/images/*.png); they do nothing yet
//
// Props: { navigation }.


export default function LoginScreen({ navigation }) {
  const { logIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your email and password');
      return;
    }

    try {
      await logIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <ScreenBackground testID='login-screen'>
      <View style={styles.content}>
        <Text style={styles.title}>Login here</Text>

        <Text style={styles.subtitle}>
          Welcome back you've been missed!
        </Text>

        <View style={styles.form}>
          <TextField
            testID="login-email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextField
            testID="login-password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            testID="login-forgot"
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgot}
          >
            <Text style={styles.forgotText}>
              Forgot your password?
            </Text>
          </Pressable>

          <FormError
            testID="login-error"
            message={error}
          />

          <PrimaryButton
            testID="login-submit"
            title="Sign in"
            onPress={handleLogin}
            style={styles.submit}
          />

          <Pressable
            testID="login-to-signup"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signupLink}
          >
            <Text style={styles.signupText}>
              Create new account
            </Text>
          </Pressable>
        </View>

        <SocialRow />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.section,
  },

  title: {
    color: COLORS.primary,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: FONT_SIZES.title,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: SPACING.small,
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.subtitle,
    textAlign: 'center',
  },

  form: {
    marginTop: SPACING.section,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: SPACING.small,
  },

  forgotText: {
    color: COLORS.primary,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
  },

  submit: {
    marginTop: SPACING.section,
  },

  signupLink: {
    alignItems: 'center',
    marginTop: SPACING.small,
  },

  signupText: {
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
  },
});