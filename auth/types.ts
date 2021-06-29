import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthActionHook<T, E> = [
  (email: string, password: string) => void,
  T | undefined,
  boolean,
  E | undefined
];
export type CreateUserOptions = {
  // emailVerificationOptions?: FirebaseAuthTypes.ActionCodeSettings;
  emailVerificationOptions?: FirebaseAuthTypes.ActionCodeSettings;
  sendEmailVerification?: boolean;
};
export type EmailAndPasswordActionHook = AuthActionHook<
  FirebaseAuthTypes.UserCredential,
  ReactNativeFirebase.NativeFirebaseError
>;
