import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProfileIcon from './components/ProfileIcon';
import FeedIcon from './components/FeedIcon';
import Feed from './screens/FeedScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { COLORS, FONTS, FONT_WEIGHTS } from './theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderProfileIcon = ({ color }) => <ProfileIcon color={color} />;
const renderFeed=({color})=><FeedIcon color={color} />

// The dashboard: one tab for now; more tabs go in here.
function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarLabelStyle: { fontFamily: FONTS.primary, fontWeight: FONT_WEIGHTS.semiBold },
        tabBarStyle: { backgroundColor: COLORS.white, borderTopColor: COLORS.divider },
      }}>
      
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: renderProfileIcon }}
      />
       <Tab.Screen
        name="Feed"
        component={Feed}
        options={{tabBarIcon: renderFeed}}
      />
     
    </Tab.Navigator>
  );
}

// Logged out: the auth screens. Logged in: the dashboard and the screens it
// opens. Switching `user` swaps the whole set, so neither side can go "back"
// into the other.
function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.white },
      }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Translucent on Android so each screen's background image runs up
          behind the status bar; ScreenBackground's SafeAreaView keeps the
          content itself below it. */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
