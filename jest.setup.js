// AsyncStorage is a native module. The package ships an in-memory mock for
// tests; without it every storage call rejects.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);
