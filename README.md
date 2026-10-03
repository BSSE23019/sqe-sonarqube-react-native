# Assignment 04 — A Social Feed on the Dashboard

Fall 2026 · Full Stack: Mobile App & Web Development · ITU

## What is here

An **empty React Native shell** — the project files, with no app code. Bring
your own Lab 04 `src/` into it and add the Feed tab.

| | |
|---|---|
| `assignment4.pdf` | the handout: read this first |
| `src/App.js` | a placeholder screen, so the project runs before you start |
| `__tests__/shared.test.js` | the tests you can run as often as you like |
| `package.json` | the dependencies and versions to use. Do not add any |
| `android/` | configured, with the Poppins fonts already registered |
| `index.js`, `app.json`, `babel.config.js`, `metro.config.js`, `jest.setup.js` | project config |

## Your lab code is not in here

You continue your **own Lab 04 app**: the six screens, `AuthContext` and
`src/theme` you already wrote. Copy your `src/` over the one in this repo,
keeping the file names you used in the lab.

Your lab screens were marked under Lab 04 and are **not marked again** here.
This assignment marks only what you add. The lab app still has to run, though,
because the Feed reads the logged-in user from your `AuthContext`.

## Getting started

```sh
npm install
npx react-native run-android     # the placeholder screen should appear
```

Then copy in your Lab 04 `src/`, and build the Feed tab: `FeedScreen.js`,
`postStore.js`, `FeedIcon.js`, and the second tab in `App.js`.

```sh
npm test
```

The tests only pass once your lab code and the Feed are both in place. Before
that they will report the files they could not find — that is expected, not a
broken project.

## Marking

`shared.test.js` is not the whole mark. Hidden tests check rules the handout
states that these do not, so read the requirements rather than coding until the
visible tests go green. Styling is **not** marked: the colours and sizes on the
handout's screenshots are there so your screen looks right, not to be graded.

Submit your repository and a screen recording of two accounts posting, liking
and deleting.
