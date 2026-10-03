import AsyncStorage from '@react-native-async-storage/async-storage';

// All users are one JSON array under 'users'.
// 'session' holds the email of whoever is logged in.
//
// Sample of what is saved:
//
// users:
// [
//   {
//     "email": "ali@mail.com",
//     "password": "secret1",
//     "name": "Ali Khan",
//     "dob": "14/02/2001",
//     "gender": "Male",
//     "createdAt": 1790000000000
//   },
//   {
//     "email": "sara@mail.com",
//     "password": "pass123",
//     "name": "",
//     "dob": "",
//     "gender": "",
//     "createdAt": 1790000500000
//   }
// ]
//
// session:
// "ali@mail.com"
//
// AsyncStorage stores strings only, so arrays go in with JSON.stringify and
// come out with JSON.parse. Every function here is async: await it.
//
// The three AsyncStorage calls you need (each returns a Promise, so await it):
//   await AsyncStorage.setItem('key', 'some string')   save a string
//   await AsyncStorage.getItem('key')                   read it back; null if
//                                                        nothing was saved
//   await AsyncStorage.removeItem('key')                delete the key
//
// Saving and reading an array:
//   await AsyncStorage.setItem('key', JSON.stringify([1, 2]));   // "[1,2]"
//   const json = await AsyncStorage.getItem('key');              // "[1,2]"
//   const list = JSON.parse(json);                               // [1, 2]

export async function getUsers() {
  // Read the 'users' key from AsyncStorage.
  // Nothing saved yet (null) -> return an empty array [].
  // Otherwise return the JSON.parse of what was read.
  //
  // Hint: const json = await AsyncStorage.getItem('users');
  const json= await AsyncStorage.getItem('users');
  if(!json) return [];
  return JSON.parse(json);
}

export async function saveUsers(users) {
  // Write the whole `users` array to the 'users' key, as a JSON string.
  //
  // Hint: AsyncStorage.setItem('users', JSON.stringify(...))
  const saveUsers=JSON.stringify(users);
  return await AsyncStorage.setItem('users', saveUsers);

}

export async function getSession() {
  // Return the email saved under 'session', or null if nobody is logged in.
  // It is already a plain string, so no JSON.parse is needed.
  //
  // Hint: return AsyncStorage.getItem('session');
  const email=await AsyncStorage.getItem('session');
   return email;
}

export async function saveSession(email) {
  // Save `email` under the 'session' key: this user is now logged in.
  // An email is already a string, so no JSON.stringify is needed.
  //
  // Hint: AsyncStorage.setItem('session', ...)
   return  await AsyncStorage.setItem('session', email);
}

export async function clearSession() {
  // Remove the 'session' key: nobody is logged in.
  //
  // Hint: AsyncStorage.removeItem(...)
  return await AsyncStorage.removeItem('session' )
}
