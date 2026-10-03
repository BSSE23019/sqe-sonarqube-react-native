# SQE: SonarQube Analysis of a React Native App

This repository contains the React Native app I analysed with SonarQube for the
Software Quality Engineering assignment (Part b: Basic Quality Report).

The app is a small social feed. It is based on my Lab 04 code and extended in
Assignment 4 with a Feed tab.

## About the app

- Welcome, Login, Sign Up and Forgot Password screens
- Profile and Edit Profile screens
- Feed tab where a logged-in user can write posts and like them
- `AuthContext` for the logged-in user
- Users and posts are stored locally with AsyncStorage

Built with React Native, React Navigation and Jest.

## Project structure

```
src/
  assets/      images and fonts
  components/  reusable UI components
  context/     AuthContext
  lib/         userStore, postStore, validate
  platform/    platform helpers
  screens/     app screens
  theme/       colors, fonts, metrics
__tests__/     Jest tests
```

## Running the project

```
npm install
npm start
npm run android
npm test
```

## SonarQube analysis

SonarQube Community Build was run locally in Docker and the `src` folder was
scanned with SonarScanner for NPM:

```
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
npm install -g @sonar/scan
sonar-scanner-npm -Dsonar.host.url=http://localhost:9000 -Dsonar.token=<token> -Dsonar.projectKey=React-Native-Assignment-4 -Dsonar.sources=src
```

### Results

| Metric | Result |
|---|---|
| Lines of code (ncloc) | 1,994 |
| Source files | 31 |
| Security | 1 issue, rating C |
| Reliability | 2 issues, rating C |
| Maintainability | 22 issues, rating A |
| Coverage | 0.0% (no coverage report imported) |
| Duplications | 4.1% |
| Security hotspots | 0 |
| Quality Gate | Passed |

The full steps, screenshots and my explanation of each metric are in the
submitted report.
