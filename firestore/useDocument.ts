import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useIsEqualRef, useLoadingValue } from '../util';
import { snapshotToData } from './helpers';
import {
  Data,
  DataOptions,
  DocumentDataHook,
  DocumentHook,
  OnceDataOptions,
  OnceOptions,
  Options,
} from './types';

export const useDocument = <T = FirebaseFirestoreTypes.DocumentData>(
  docRef?: FirebaseFirestoreTypes.DocumentReference | null,
  options?: Options
): DocumentHook<T> => {
  return useDocumentInternal<T>(true, docRef, options);
};

export const useDocumentOnce = <T = FirebaseFirestoreTypes.DocumentData>(
  docRef?: FirebaseFirestoreTypes.DocumentReference | null,
  options?: OnceOptions
): DocumentHook<T> => {
  return useDocumentInternal<T>(false, docRef, options);
};

export const useDocumentData = <
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
>(
  docRef?: FirebaseFirestoreTypes.DocumentReference | null,
  options?: DataOptions<T>
): DocumentDataHook<T, IDField, RefField> => {
  return useDocumentDataInternal<T, IDField, RefField>(true, docRef, options);
};

export const useDocumentDataOnce = <
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
>(
  docRef?: FirebaseFirestoreTypes.DocumentReference | null,
  options?: OnceDataOptions<T>
): DocumentDataHook<T, IDField, RefField> => {
  return useDocumentDataInternal<T, IDField, RefField>(false, docRef, options);
};

const useDocumentInternal = <T = FirebaseFirestoreTypes.DocumentData>(
  listen: boolean,
  docRef?: FirebaseFirestoreTypes.DocumentReference | null,
  options?: Options & OnceOptions
): DocumentHook<T> => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    FirebaseFirestoreTypes.DocumentSnapshot,
    Error
  >();
  const ref = useIsEqualRef(docRef, reset);

  useEffect(() => {
    if (!ref.current) {
      setValue(undefined);
      return;
    }
    if (listen) {
      const listener =
        options && options.snapshotListenOptions
          ? ref.current.onSnapshot(
              options.snapshotListenOptions,
              setValue,
              setError
            )
          : ref.current.onSnapshot(setValue, setError);

      return () => {
        listener();
      };
    } else {
      ref.current
        .get(options ? options.getOptions : undefined)
        .then(setValue)
        .catch(setError);
    }
  }, [ref.current]);

  const resArray: DocumentHook<T> = [
    value as FirebaseFirestoreTypes.DocumentSnapshot<T>,
    loading,
    error,
  ];
  return useMemo(() => resArray, resArray);
};

const useDocumentDataInternal = <
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
>(
  listen: boolean,
  docRef?: FirebaseFirestoreTypes.DocumentReference | null,
  options?: DataOptions<T>
): DocumentDataHook<T, IDField, RefField> => {
  const idField = options ? options.idField : undefined;
  const refField = options ? options.refField : undefined;
  const snapshotOptions = options ? options.snapshotOptions : undefined;
  const transform = options ? options.transform : undefined;
  const [snapshot, loading, error] = useDocumentInternal<T>(
    listen,
    docRef,
    options
  );
  const value = useMemo(
    () =>
      (snapshot
        ? snapshotToData<T>(
            snapshot,
            snapshotOptions,
            idField,
            refField,
            transform
          )
        : undefined) as Data<T, IDField, RefField>,
    [snapshot, snapshotOptions, idField, refField, transform]
  );

  const resArray: DocumentDataHook<T, IDField, RefField> = [
    value,
    loading,
    error,
  ];
  return useMemo(() => resArray, resArray);
};
