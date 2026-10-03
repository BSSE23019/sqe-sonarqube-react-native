// Small checks used by the forms. Each takes the text the user typed.
// These are given to you ready-made: import and use them in the screens.
//
// HOW TO USE THEM
//
// 1. Import what you need at the top of the screen:
//      import { isEmail } from '../lib/validate';                   // SignUpScreen
//      import { formatDob, isValidDob } from '../lib/validate';     // EditProfileScreen
//
// 2. isEmail: check before signing up, show an error and stop if it fails:
//      if (!isEmail(email)) {
//        setError('Enter a valid email');
//        return;
//      }
//
// 3. formatDob: run it inside onChangeText, so the slashes appear as the
//    user types:
//      <TextField
//        value={dob}
//        onChangeText={(text) => setDob(formatDob(text))}
//        keyboardType="number-pad"
//        maxLength={10}
//      />
//
// 4. isValidDob: check when Save is pressed. DOB is optional, so only check it
//    when something was typed:
//      if (dob && !isValidDob(dob)) {
//        setError('Enter date of birth as DD/MM/YYYY');
//        return;
//      }

// Used by Sign Up: true when `text` looks like an email, e.g. "ali@mail.com".
export const isEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());

// Used by Update Profile on every keystroke of the Date of birth input:
// turns typed digits into DD/MM/YYYY, adding the slashes as you go.
//   "14" -> "14"    "1402" -> "14/02"    "14022001" -> "14/02/2001"
export function formatDob(text) {
  const d = text.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

// Used by Update Profile when Save is pressed: true only for a real date
// written as DD/MM/YYYY, from 1900 up to today. 31/04 or 29/02 in a
// non-leap year roll over into the next month, so they fail the check.
export function isValidDob(text) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!m) return false;
  const [day, month, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    year >= 1900 &&
    date <= new Date()
  );
}
