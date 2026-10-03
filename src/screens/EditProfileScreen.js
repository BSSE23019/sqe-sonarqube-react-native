
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ScreenBackground from '../components/ScreenBackground';
import Avatar from '../components/Avatar';
import TextField from '../components/TextField';
import GenderPicker from '../components/GenderPicker';
import PrimaryButton from '../components/PrimaryButton';

import { useAuth } from '../context/AuthContext';
import { formatDob, isValidDob } from '../lib/validate';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
} from '../theme';

// UPDATE PROFILE SCREEN (opened from Profile)
//
// It will hold:
//   - the background image
//   - title "Update Profile"                       Bold 30, primary, centred
//   - the avatar again, with initials that follow the name as it is typed
//   - state: name, dob, gender, error, each starting from the current user
//   - "Full name" input (required)
//   - "Date of birth" input: number pad, typed as DD/MM/YYYY with the slashes
//     added automatically; must be a real date between 1900 and today
//     (use formatDob and isValidDob from '../lib/validate')
//   - "Gender": two options side by side, Male and Female; the chosen one is
//     filled with primary
//   - an error message in red
//   - "Save" button: check the fields, merge { name, dob, gender } into this
//     user inside the users JSON, save it to AsyncStorage, update the
//     logged-in user, then navigation.goBack()
//   - "Cancel" link -> navigation.goBack() without saving
//
// Props: { navigation }.


export default function EditProfileScreen({ navigation }) {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name || '');
  const [dob, setDob] = useState(user.dob || '');
  const [gender, setGender] = useState(user.gender || '');

  async function handleSave() {
    if (dob && !isValidDob(dob)) {
      return;
    }

    await updateProfile({
      name: name.trim(),
      dob,
      gender,
    });

    navigation.goBack();

  }

  return (
    <ScreenBackground testID='edit-profile-screen'>
      <View style={styles.content}>
        <Text style={styles.title}>
          Update Profile
        </Text>

        <Avatar
          user={{
            ...user,
            name,
          }}
          size={100}
        />

        <View style={styles.form}>
          <Text style={styles.label}>
            Full name
          </Text>

          <TextField
            testID="edit-name"
            placeholder="Full name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            Date of birth
          </Text>

          <TextField
            testID="edit-dob"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChangeText={text => setDob(formatDob(text))}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>
            Gender
          </Text>

          <GenderPicker
            value={gender}
            onChange={setGender}
          />

          <PrimaryButton
            testID="edit-save"
            title="Save"
            onPress={handleSave}
            style={styles.saveButton}
          />

          <Pressable
            testID="edit-cancel"
            onPress={() => navigation.goBack()}
            style={styles.cancel}
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: SPACING.section,
  },

  title: {
    color: COLORS.primary,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: FONT_SIZES.title,
    textAlign: 'center',
    marginBottom: SPACING.section,
  },

  form: {
    width: '100%',
    marginTop: SPACING.section,
  },

  label: {
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
    marginBottom: SPACING.small,
  },

  saveButton: {
    marginTop: SPACING.section,
  },

  cancel: {
    alignItems: 'center',
    paddingVertical: SPACING.small,
    marginTop: SPACING.small,
  },

  cancelText: {
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
  },
});