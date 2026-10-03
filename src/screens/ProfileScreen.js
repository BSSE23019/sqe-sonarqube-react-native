import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ScreenBackground from '../components/ScreenBackground';
import Avatar from '../components/Avatar';
import PrimaryButton from '../components/PrimaryButton';

import { useAuth } from '../context/AuthContext';

import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
  RADIUS,
  SIZES,
} from '../theme';


// PROFILE SCREEN: the only tab of the dashboard (logged-in users).
//
// It will hold:
//   - the background image (no bottom safe-area padding: the tab bar is there)
//   - title "Profile"                              Bold 30, primary, centred
//   - a round avatar showing the user's initials (from the name, or the first
//     letter of the email when there is no name yet); stands in for a photo
//   - the user's name ("Add your name" if empty) and email under it
//   - a card with one row per detail, label left and value right:
//       Full name, Email, Date of birth, Gender, Member since (from createdAt)
//     an empty value shows "Not set"
//   - "Update Profile" button -> navigation.navigate('EditProfile')
//   - "Log out" link: clear the logged-in user; the app goes back to Welcome
//
// Props: { navigation }. The user comes from wherever you keep the
// logged-in user (for example a context shared by the whole app).


function formatMemberSince(timestamp) {
  const date = new Date(timestamp);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function ProfileScreen({ navigation }) {
  const { user, logOut } = useAuth();

  const displayName = user.name || 'Add your name';

  return (
    <ScreenBackground  testID='profile-screen'>
      <View style={styles.content}>

        <Avatar
          user={user}
          size={110}
          testID="profile-avatar"
        />

        <Text
          testID="profile-name"
          style={styles.name}
        >
          {displayName}
        </Text>

        <Text
          testID="profile-email"
          style={styles.email}
        >
          {user.email}
        </Text>

        <View style={styles.card}>

          <View style={styles.row}>
            <Text style={styles.label}>Full name</Text>
            <Text style={styles.value}>
              {user.name || 'Not set'}
            </Text>
          </View>

          <View style={styles.row} >
            <Text style={styles.label}>Email</Text>
            <Text testID="profile-row-email" style={styles.value}>
              {user.email}
            </Text>
          </View>

          <View style={styles.row} >
            <Text style={styles.label}>Date of birth</Text>
            <Text testID='profile-row-dob' style={styles.value}>
              {user.dob || 'Not set'}
            </Text>
          </View>

          <View style={styles.row} >
            <Text style={styles.label}>Gender</Text>
            <Text testID='profile-row-gender' style={styles.value}>
              {user.gender || 'Not set'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Member since</Text>
            <Text style={styles.value}>
              {formatMemberSince(user.createdAt)}
            </Text>
          </View>

        </View>

        <PrimaryButton
          testID="profile-update"
          title="Update Profile"
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.updateButton}
        />

        <Pressable
          onPress={logOut}
          style={styles.logout}
          testID='profile-logout'
        >
          <Text style={styles.logoutText}>
            Log out
          </Text>
        </Pressable>

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

  name: {
    marginTop: SPACING.small,
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: FONT_SIZES.title,
    textAlign: 'center',
  },

  email: {
    marginTop: SPACING.small,
    color: COLORS.textMuted,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.regular,
    fontSize: FONT_SIZES.body,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    marginTop: SPACING.section,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.inputBg,
  },

  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },

  label: {
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.regular,
    fontSize: FONT_SIZES.body,
  },

  value: {
    color: COLORS.text,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.body,
  },

  updateButton: {
    width: '100%',
    marginTop: SPACING.section,
  },

  logout: {
    marginTop: SPACING.small,
    paddingVertical: SPACING.small,
  },

  logoutText: {
    color: COLORS.primary,
    fontFamily: FONTS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.small,
  },
});