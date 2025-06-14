import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export const initFireBase = () => {
  const databaseURL =
    "https://resu-friends-default-rtdb.europe-west1.firebasedatabase.app/";

  const firebaseConfig = {
    databaseURL,
  };

  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
};

export const getData = (db, path, callback) => {
  onValue(ref(db, path), (snapshot) => {
    if (snapshot.exists()) callback(snapshot.val());
  });
};

export const getOnce = async (db, path, callback) => {
  const snapshot = await get(ref(db, path));
  if (snapshot.exists()) callback(snapshot.val());
};

export const updateData = (db, path, newData) => {
  return update(ref(db, path), newData);
};
