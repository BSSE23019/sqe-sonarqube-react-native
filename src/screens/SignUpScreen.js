
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ScreenBackground from '../components/ScreenBackground';
import TextField from '../components/TextField';
import FormError from '../components/FormError';
import PrimaryButton from '../components/PrimaryButton';
import SocialRow from '../components/SocialRow';

import { useAuth } from '../context/AuthContext';
import { isEmail } from '../lib/validate';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
} from '../theme';
// SIGN UP SCREEN
//
// It will hold:
//   - the background image
//   - title "Create Account"                      Bold 30, primary, centred
//   - subtitle "Create an account so you can explore all the existing jobs"
//                                                 SemiBold, centred
//   - state: email, password, confirm, error
//   - Email, Password and Confirm Password inputs
//   - an error message in red
//   - "Sign up" button, checked in this order:
//       1. not a valid email            -> "Enter a valid email"
//          (use isEmail from '../lib/validate')
//       2. password under 6 characters  -> "Password must be at least 6 characters"
//       3. password !== confirm         -> "Passwords do not match"
//       4. email already in the users JSON -> "An account with this email already exists"
//       5. otherwise add { email, password, name: '', dob: '', gender: '',
//          createdAt: Date.now() } to the users array, save it to AsyncStorage
//          and log the new user in
//   - "Already have an account" link -> navigation.navigate('Login')
//   - "Or continue with" and the three social images
//
// Props: { navigation }.




export default function SignUpScreen({ navigation }) {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  async function handleSignUp() {
    setError('');

    if (!isEmail(email.trim())) {
      setError('Enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <ScreenBackground testID='signup-screen'>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Create an account so you can explore all the existing jobs
        </Text>

        <View style={styles.form}>
          <TextField
            testID="signup-email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextField
            testID="signup-password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextField
            testID="signup-confirm"
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />

          <FormError
            testID="signup-error"
            message={error}
          />

          <PrimaryButton
            testID="signup-submit"
            title="Sign up"
            onPress={handleSignUp}
            style={styles.submit}
          />

          <Pressable
            testID="signup-to-login"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account
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

  submit: {
    marginTop: SPACING.section,
  },

  loginLink: {
    alignItems: 'center',
    marginTop: SPACING.small,
  },

  loginText: {
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
  },
});