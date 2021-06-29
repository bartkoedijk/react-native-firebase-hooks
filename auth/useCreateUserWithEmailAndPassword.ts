import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useMemo, useState } from 'react';
import { CreateUserOptions, EmailAndPasswordActionHook } from './types';

export default (
  auth: FirebaseAuthTypes.Module,
  options?: CreateUserOptions
): EmailAndPasswordActionHook => {
  const [error, setError] = useState<ReactNativeFirebase.NativeFirebaseError>();
  const [
    registeredUser,
    setRegisteredUser,
  ] = useState<FirebaseAuthTypes.UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      if (options && options.sendEmailVerification && user.user) {
        await user.user.sendEmailVerification(options.emailVerificationOptions);
      }
      setRegisteredUser(user);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const resArray: EmailAndPasswordActionHook = [
    createUserWithEmailAndPassword,
    registeredUser,
    loading,
    error,
  ];
  return useMemo<EmailAndPasswordActionHook>(() => resArray, resArray);
};
