import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getUsers,
  saveUsers,
  getSession,
  saveSession,
  clearSession,
} from '../lib/userStore';

// Shares the logged-in user with every screen. Wrap the app in <AuthProvider>
// (in App.js) and any screen can call useAuth() to get:
//   { user, loading, signUp, logIn, logOut, updateProfile }
// App.js shows the logged-out screens while `user` is null and the dashboard
// once it is set, so no screen has to navigate after login or logout.

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // user     the logged-in user object, or null
  // loading  true until the saved session has been checked on start; App.js
  //          shows a spinner until restore() sets it to false
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs once, when the app opens ([] = no dependencies).
  useEffect(() => {
    restore();
  }, []);

  async function restore() {
    // This is what keeps the user logged in after the app is killed: when it
    // is opened again they land straight on Profile, not on Welcome/Login.
    // 1. read the session email (getSession)
    // 2. get the users array
    // 3. set `user` to the user with that email, or null if there is none
    // 4. set loading to false, so the app leaves the spinner and shows a screen
    //    (this line is here so the starter runs; keep it as your step 4)

    const session = await getSession();
    const user = await getUsers();
    const currentUser = user.find(u => {
      return u.email === session;
    });
    setUser(currentUser);
    setLoading(false);
  }

  async function signUp(email, password) {
    // 1. tidy the email: trim spaces, lower-case it
    // 2. get the users array
    // 3. if a user already has this email:
    //      throw new Error('An account with this email already exists')
    //    (the screen catches it and shows error.message)
    // 4. make the new user:
    //      { email, password, name: '', dob: '', gender: '', createdAt: Date.now() }
    // 5. save the array with the new user added
    // 6. save the session (this email) and set `user` to the new user
    const e = email.trim().toLowerCase();
    const users = await getUsers();

    const repeat = users.some(u => {
      return u.email === e;
    });

    if (repeat) {
      throw new Error('An account with this email already exists');
    }

    const user = {
      email: e,
      password,
      name: '',
      dob: '',
      gender: '',
      createdAt: Date.now(),
    };

    users.push(user);

    await saveUsers(users);
    await saveSession(e);
    setUser(user);
  }

  async function logIn(email, password) {
    // 1. tidy the email: trim spaces, lower-case it
    // 2. get the users array and find the user with this email AND password
    // 3. none found: throw new Error('Incorrect email or password')
    // 4. found: save the session (this email) and set `user` to them
    const e = email.trim().toLowerCase();
    const users = await getUsers();

    const foundUser = users.find(u => {
      return u.email === e && u.password === password;
    });
    if (!foundUser) throw new Error('Incorrect email or password');
    await saveSession(e);
    setUser(foundUser);
  }

  async function logOut() {
    // clear the session and set `user` back to null
    await clearSession();
    setUser(null);
  }

  async function updateProfile(changes) {
    // `changes` is { name, dob, gender } from the Update Profile screen.
    // 1. make the updated user: the current user with `changes` merged in
    // 2. get the users array, swap in the updated user where the email
    //    matches (map), and save the array
    // 3. set `user` to the updated user so Profile shows the new details
    const updatedUser = {
      ...user,
      ...changes,
    };
    const users = await getUsers();
    const updatedUsers = users.map(u => {
      if (u.email === updatedUser.email) {
        return updatedUser;
      }

      return u;
    });
    await saveUsers(updatedUsers);
    setUser(updatedUser);
  }


// Everything inside <AuthProvider> can read this value with useAuth().
return (
  <AuthContext.Provider
    value={{ user, loading, signUp, logIn, logOut, updateProfile }}
  >
    {children}
  </AuthContext.Provider>
);
}
// Any screen: const { user, logIn } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
