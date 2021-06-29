import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useMemo } from 'react';
import { LoadingHook, useLoadingValue } from '../util';

export type AuthStateHook = LoadingHook<
  FirebaseAuthTypes.User | null,
  FirebaseAuthTypes.NativeFirebaseAuthError
>;

export default (auth: FirebaseAuthTypes.Module): AuthStateHook => {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    FirebaseAuthTypes.User | null,
    FirebaseAuthTypes.NativeFirebaseAuthError
  >(() => auth.currentUser);

  useEffect(() => {
    const listener = auth.onAuthStateChanged(setValue);

    return () => {
      listener();
    };
  }, [auth]);

  const resArray: AuthStateHook = [value, loading, error];
  return useMemo<AuthStateHook>(() => resArray, resArray);
};
