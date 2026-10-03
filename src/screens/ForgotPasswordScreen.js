import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ScreenBackground from '../components/ScreenBackground';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
} from '../theme';


// FORGOT PASSWORD SCREEN (opened from Login)
//
// It will hold:
//   - the background image
//   - title "Forgot Password"                     Bold 30, primary, centred
//   - subtitle "Enter your email and we'll send you a link to reset your
//     password"                                   SemiBold 20, centred
//   - state: email, sent (true/false)
//   - Email input and a "Send reset link" button
//   - there is no backend: pressing the button with an email entered sets
//     sent = true, which hides the form and changes the subtitle to
//     "We've sent a reset link to <email>"
//   - "Back to login" link -> navigation.goBack()
//
// Props: { navigation }.



export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!email.trim()) {
      return;
    }

    setSent(true);
  }

  return (
    <ScreenBackground>
      <View style={styles.content}>
        <Text style={styles.title}>
          Forgot Password
        </Text>

        <Text style={styles.subtitle}>
          {sent
            ? `We've sent a reset link to ${email}`
            : "Enter your email and we'll send you a link to reset your password"}
        </Text>

        {!sent && (
          <View style={styles.form}>
            <TextField
              testID="forgot-email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <PrimaryButton
              testID="forgot-submit"
              title="Send reset link"
              onPress={handleSend}
              style={styles.submit}
            />
          </View>
        )}

        <Pressable
          testID="forgot-to-login"
          onPress={() => navigation.goBack()}
          style={styles.backLink}
        >
          <Text style={styles.backText}>
            Back to login
          </Text>
        </Pressable>
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

  backLink: {
    alignItems: 'center',
    marginTop: SPACING.section,
  },

  backText: {
    color: COLORS.primary,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
  },
});
