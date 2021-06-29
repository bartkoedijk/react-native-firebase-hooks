import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useMemo, useState } from 'react';
import { EmailAndPasswordActionHook } from './types';

export default (auth: FirebaseAuthTypes.Module): EmailAndPasswordActionHook => {
  const [error, setError] = useState<ReactNativeFirebase.NativeFirebaseError>();
  const [
    loggedInUser,
    setLoggedInUser,
  ] = useState<FirebaseAuthTypes.UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      setLoggedInUser(user);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const resArray: EmailAndPasswordActionHook = [
    signInWithEmailAndPassword,
    loggedInUser,
    loading,
    error,
  ];
  return useMemo<EmailAndPasswordActionHook>(() => resArray, resArray);
};
