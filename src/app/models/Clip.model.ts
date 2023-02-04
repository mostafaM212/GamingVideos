import firebase from 'firebase/compat/app';

export interface Clip {
  uid: string;
  docId?: string;
  displayName: string;
  title: string;
  fileName: string;
  url: string;
  thumbnail: string;
  timestamp: firebase.firestore.FieldValue;
  screenshotFileName?: string;
}
