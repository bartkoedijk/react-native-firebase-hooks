import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useIsEqualRef, useLoadingValue } from '../util';
import { snapshotToData } from './helpers';
import {
  CollectionDataHook,
  CollectionHook,
  Data,
  DataOptions,
  OnceDataOptions,
  OnceOptions,
  Options,
} from './types';

export const useCollection = <T = FirebaseFirestoreTypes.DocumentData>(
  query?: FirebaseFirestoreTypes.Query | null,
  options?: Options
): CollectionHook<T> => {
  return useCollectionInternal<T>(true, query, options);
};

export const useCollectionOnce = <T = FirebaseFirestoreTypes.DocumentData>(
  query?: FirebaseFirestoreTypes.Query<T> | null,
  options?: OnceOptions
): CollectionHook<T> => {
  return useCollectionInternal<T>(false, query, options);
};

export const useCollectionData = <
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
>(
  query?: FirebaseFirestoreTypes.Query | null,
  options?: DataOptions<T>
): CollectionDataHook<T, IDField, RefField> => {
  return useCollectionDataInternal<T, IDField, RefField>(true, query, options);
};

export const useCollectionDataOnce = <
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
>(
  query?: FirebaseFirestoreTypes.Query | null,
  options?: OnceDataOptions<T>
): CollectionDataHook<T, IDField, RefField> => {
  return useCollectionDataInternal<T, IDField, RefField>(false, query, options);
};

const useCollectionInternal = <T = FirebaseFirestoreTypes.DocumentData>(
  listen: boolean,
  query?: FirebaseFirestoreTypes.Query | null,
  options?: Options & OnceOptions
) => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    FirebaseFirestoreTypes.QuerySnapshot,
    Error
  >();
  const ref = useIsEqualRef(query, reset);

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

  const resArray: CollectionHook<T> = [
    value as FirebaseFirestoreTypes.QuerySnapshot<T>,
    loading,
    error,
  ];
  return useMemo(() => resArray, resArray);
};

const useCollectionDataInternal = <
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
>(
  listen: boolean,
  query?: FirebaseFirestoreTypes.Query | null,
  options?: DataOptions<T> & OnceDataOptions<T>
): CollectionDataHook<T, IDField, RefField> => {
  const idField = options ? options.idField : undefined;
  const refField = options ? options.refField : undefined;
  const snapshotOptions = options ? options.snapshotOptions : undefined;
  const transform = options ? options.transform : undefined;
  const [snapshots, loading, error] = useCollectionInternal<T>(
    listen,
    query,
    options
  );
  const values = useMemo(
    () =>
      (snapshots
        ? snapshots.docs.map((doc) =>
            snapshotToData<T>(
              doc,
              snapshotOptions,
              idField,
              refField,
              transform
            )
          )
        : undefined) as Data<T, IDField, RefField>[],
    [snapshots, snapshotOptions, idField, refField, transform]
  );

  const resArray: CollectionDataHook<T, IDField, RefField> = [
    values,
    loading,
    error,
  ];
  return useMemo(() => resArray, resArray);
};
