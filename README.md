# React Native Firebase Hooks

A set of reusable [React Hooks](https://reactjs.org/docs/hooks-intro.html) for [Firebase](https://firebase.google.com/).

This is the React Native version that uses the typings of @react-native-firebase package. To use Firebase hooks with the Firebase JS SDK go to: [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks)

[![npm version](https://img.shields.io/npm/v/react-native-firebase-hooks.svg?style=flat-square)](https://www.npmjs.com/package/react-native-firebase-hooks)
[![npm downloads](https://img.shields.io/npm/dm/react-native-firebase-hooks.svg?style=flat-square)](https://www.npmjs.com/package/react-native-firebase-hooks)

## Installation


React Native Firebase Hooks requires **[react](https://www.npmjs.com/package/react) 16.8.0 or later** and **[@react-native-firebase/app
](https://www.npmjs.com/package/@react-native-firebase/app) v12.0.0 or later**.

> Official support for Hooks was added to React Native in v0.59.0. React Native Firebase Hooks works best for React Native that uses the @react-native-firebase package. This package also works for when using Firebase JS SDK (v8.0.0+) although it could give type definition errors. 

```bash
# with npm
npm install --save react-native-firebase-hooks

# with yarn
yarn add react-native-firebase-hooks
```

This assumes that you’re using the [npm](https://npmjs.com) or [yarn](https://yarnpkg.com/) package managers with a module bundler like [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/) to consume [CommonJS](http://webpack.github.io/docs/commonjs.html) modules.

## Why?

There has been a **lot** of hype around React Hooks, but this hype merely reflects that there are obvious real world benefits of Hooks to React developers everywhere.

This library explores how React Hooks can work to make integration with Firebase even more straightforward than it already is. It takes inspiration for naming from RxFire and is based on an internal library that we had been using in a number of apps prior to the release of React Hooks. The implementation with hooks is 10x simpler than our previous implementation.

## Documentation

- [Auth Hooks](/auth)
- [Cloud Firestore Hooks](/firestore)
- [Cloud Storage Hooks](/storage)
- [Realtime Database Hooks](/database)

## License

- See [LICENSE](/LICENSE)
