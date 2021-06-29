import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { LoadingHook } from '../util';

export type IDOptions<T> = {
  idField?: string;
  refField?: string;
  snapshotOptions?: FirebaseFirestoreTypes.SnapshotListenOptions;
  transform?: (val: any) => T;
};
export type Options = {
  snapshotListenOptions?: FirebaseFirestoreTypes.SnapshotListenOptions;
};
export type DataOptions<T> = Options & IDOptions<T>;
export type OnceOptions = {
  getOptions?: FirebaseFirestoreTypes.GetOptions;
};
export type OnceDataOptions<T> = OnceOptions & IDOptions<T>;
export type Data<
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
> = T &
  Record<IDField, string> &
  Record<RefField, FirebaseFirestoreTypes.DocumentReference<T>>;

export type CollectionHook<
  T = FirebaseFirestoreTypes.DocumentData
> = LoadingHook<FirebaseFirestoreTypes.QuerySnapshot<T>, Error>;
export type CollectionDataHook<
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
> = LoadingHook<Data<T, IDField, RefField>[], Error>;

export type DocumentHook<T = FirebaseFirestoreTypes.DocumentData> = LoadingHook<
  FirebaseFirestoreTypes.DocumentSnapshot<T>,
  Error
>;
export type DocumentDataHook<
  T = FirebaseFirestoreTypes.DocumentData,
  IDField extends string = '',
  RefField extends string = ''
> = LoadingHook<Data<T, IDField, RefField>, Error>;
