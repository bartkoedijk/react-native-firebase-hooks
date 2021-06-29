import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import firebase from 'firebase/app';
import { LoadingHook } from '../util';

export type Val<
  T,
  KeyField extends string = '',
  RefField extends string = ''
> = T &
  Record<KeyField, string> &
  Record<RefField, firebase.database.Reference>;

export type ObjectHook = LoadingHook<
  FirebaseDatabaseTypes.DataSnapshot,
  ReactNativeFirebase.NativeFirebaseError
>;
export type ObjectValHook<
  T,
  KeyField extends string = '',
  RefField extends string = ''
> = LoadingHook<
  Val<T, KeyField, RefField>,
  ReactNativeFirebase.NativeFirebaseError
>;

export type ListHook = LoadingHook<
  FirebaseDatabaseTypes.DataSnapshot[],
  ReactNativeFirebase.NativeFirebaseError
>;
export type ListKeysHook = LoadingHook<
  string[],
  ReactNativeFirebase.NativeFirebaseError
>;
export type ListValsHook<
  T,
  KeyField extends string = '',
  RefField extends string = ''
> = LoadingHook<
  Val<T, KeyField, RefField>[],
  ReactNativeFirebase.NativeFirebaseError
>;
