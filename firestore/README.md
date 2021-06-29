# React Native Firebase Hooks - Cloud Firestore

React Native Firebase Hooks provides convenience listeners for Collections and Documents stored with
Cloud Firestore. The hooks wrap around the `firebase.firestore.collection().onSnapshot()`
and `firebase.firestore().doc().onSnapshot()` methods.

In addition to returning the snapshot value, the hooks provide an `error` and `loading` property
to give a complete lifecycle for loading and listening to Cloud Firestore.

There are 2 variants of each hook:

- `useX` which subscribes to the underlying Collection or Document and listens for changes
- `useXOnce` which reads the current value of the Collection or Document

All hooks can be imported from `react-native-firebase-hooks/firestore`, e.g.

```js
import { useCollection } from 'react-native-firebase-hooks/firestore';
```

List of Cloud Firestore hooks:

- [useCollection](#usecollection)
- [useCollectionOnce](#usecollectiononce)
- [useCollectionData](#usecollectiondata)
- [useCollectionDataOnce](#usecollectiondataonce)
- [useDocument](#usedocument)
- [useDocumentOnce](#usedocumentonce)
- [useDocumentData](#usedocumentdata)
- [useDocumentDataOnce](#usedocumentdataonce)

Additional functionality:

- [Transforming data](#transforming-data)

### useCollection

```js
const [snapshot, loading, error] = useCollection(query, options);
```

Retrieve and monitor a collection value in Cloud Firestore.

Returns a `FirebaseFirestoreTypes.QuerySnapshot` (if a query is specified), a `boolean` to indicate if the data is still being loaded and any `Error` returned by Firebase when trying to load the data.

The `useCollection` hook takes the following parameters:

- `query`: (optional) `FirebaseFirestoreTypes.Query` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `snapshotListenOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how the query is loaded

Returns:

- `snapshot`: a `FirebaseFirestoreTypes.QuerySnapshot`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

#### Full example

```js
import { useCollection } from 'react-native-firebase-hooks/firestore';

const FirestoreCollection = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('hooks'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{' '}
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{' '}
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
};
```

### useCollectionOnce

```js
const [snapshot, loading, error] = useCollectionOnce(query, options);
```

Retrieve the current value of the `FirebaseFirestoreTypes.Query`.

The `useCollectionOnce` hook takes the following parameters:

- `query`: (optional) `FirebaseFirestoreTypes.Query` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `getOptions`: (optional) `FirebaseFirestoreTypes.GetOptions` to customise how the collection is loaded

Returns:

- `snapshot`: a `FirebaseFirestoreTypes.QuerySnapshot`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

### useCollectionData

```js
const [values, loading, error] = useCollectionData < T > (query, options);
```

As `useCollection`, but this hook extracts a typed list of the `FirebaseFirestoreTypes.QuerySnapshot.docs` values, rather than the
`FirebaseFirestoreTypes.QuerySnapshot` itself.

The `useCollectionData` hook takes the following parameters:

- `query`: (optional) `FirebaseFirestoreTypes.Query` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `idField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.QuerySnapshot.id` property.
  - `refField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.QuerySnapshot.ref` property.
  - `snapshotListenOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how the collection is loaded
  - `snapshotOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how data is retrieved from snapshots
  - `transform`: (optional) a function that receives the raw `FirebaseFirestoreTypes.DocumentData` for each item in the collection to allow manual transformation of the data where required by the application. See [`Transforming data`](#transforming-data) below.

Returns:

- `values`: an array of `T`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

### useCollectionDataOnce

```js
const [values, loading, error] = useCollectionDataOnce < T > (query, options);
```

As `useCollectionData`, but this hook will only read the current value of the `FirebaseFirestoreTypes.Query`.

The `useCollectionDataOnce` hook takes the following parameters:

- `query`: (optional) `FirebaseFirestoreTypes.Query` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `getOptions`: (optional) `FirebaseFirestoreTypes.GetOptions` to customise how the collection is loaded
  - `idField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.QuerySnapshot.id` property.
  - `refField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.QuerySnapshot.ref` property.
  - `snapshotOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how data is retrieved from snapshots
  - `transform`: (optional) a function that receives the raw `FirebaseFirestoreTypes.DocumentData` for each item in the collection to allow manual transformation of the data where required by the application. See [`Transforming data`](#transforming-data) below.

Returns:

- `values`: an array of `T`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

### useDocument

```js
const [snapshot, loading, error] = useDocument(reference, options);
```

Retrieve and monitor a document value in Cloud Firestore.

The `useDocument` hook takes the following parameters:

- `reference`: (optional) `FirebaseFirestoreTypes.DocumentReference` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `snapshotListenOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how the query is loaded

Returns:

- `snapshot`: a `FirebaseFirestoreTypes.DocumentSnapshot`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

#### Full example

```js
import { useDocument } from 'react-native-firebase-hooks/firestore';

const FirestoreDocument = () => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc('hooks/nBShXiRGFAhuiPfBaGpt'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && <span>Document: {JSON.stringify(value.data())}</span>}
      </p>
    </div>
  );
};
```

### useDocumentOnce

```js
const [snapshot, loading, error] = useDocumentOnce(reference, options);
```

Retrieve the current value of the `FirebaseFirestoreTypes.DocumentReference`.

The `useDocumentOnce` hook takes the following parameters:

- `reference`: (optional) `FirebaseFirestoreTypes.DocumentReference` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `getOptions`: (optional) `FirebaseFirestoreTypes.GetOptions` to customise how the collection is loaded

Returns:

- `snapshot`: a `FirebaseFirestoreTypes.DocumentSnapshot`, or `undefined` if no reference is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

### useDocumentData

```js
const [value, loading, error] = useDocumentData < T > (reference, options);
```

As `useDocument`, but this hook extracts the typed contents of `FirebaseFirestoreTypes.DocumentSnapshot.val()`, rather than the
`FirebaseFirestoreTypes.DocumentSnapshot` itself.

The `useDocumentData` hook takes the following parameters:

- `reference`: (optional) `FirebaseFirestoreTypes.DocumentReference` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `idField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.DocumentSnapshot.id` property.
  - `refField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.QuerySnapshot.ref` property.
  - `snapshotListenOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how the collection is loaded
  - `snapshotOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how data is retrieved from snapshots
  - `transform`: (optional) a function that receives the raw `FirebaseFirestoreTypes.DocumentData` to allow manual transformation of the data where required by the application. See [`Transforming data`](#transforming-data) below.

Returns:

- `value`: `T`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

### useDocumentDataOnce

```js
const [value, loading, error] = useDocumentDataOnce < T > (reference, options);
```

As `useDocument`, but this hook will only read the current value of the `FirebaseFirestoreTypes.DocumentReference`.

The `useDocumentDataOnce` hook takes the following parameters:

- `reference`: (optional) `FirebaseFirestoreTypes.DocumentReference` for the data you would like to load
- `options`: (optional) `Object` with the following parameters:
  - `getOptions`: (optional) `FirebaseFirestoreTypes.GetOptions` to customise how the collection is loaded
  - `idField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.DocumentSnapshot.id` property.
  - `refField`: (optional) name of the field that should be populated with the `FirebaseFirestoreTypes.QuerySnapshot.ref` property.
  - `snapshotOptions`: (optional) `FirebaseFirestoreTypes.SnapshotListenOptions` to customise how data is retrieved from snapshots
  - `transform`: (optional) a function that receives the raw `FirebaseFirestoreTypes.DocumentData` to allow manual transformation of the data where required by the application. See [`Transforming data`](#transforming-data) below.

Returns:

- `value`: `T`, or `undefined` if no query is supplied
- `loading`: a `boolean` to indicate if the data is still being loaded
- `error`: Any `Error` returned by Firebase when trying to load the data, or `undefined` if there is no error

## Transforming data

Firestore allows a restricted number of data types in its store, which may not be flexible enough for your application. Both `useCollectionData` and `useDocumentData` support an optional `transform` function which allows the transformation of the underlying Firestore data into whatever format the application requires, e.g. a `Date` type.

```js
transform?: (val: any) => T;
```

The `transform` function is passed a single row of a data, so will be called once when used with `useDocumentData` and multiple times when used with `useCollectionData`.

The `transform` function will not receive the `id` or `ref` values referenced in the properties named in the `idField` or `refField` options, nor it is expected to produce them. Either or both, if specified, will be merged afterwards.

If the `transform` function is defined within your React component, it is recomended that you memoize the function to prevent unnecessry renders.
