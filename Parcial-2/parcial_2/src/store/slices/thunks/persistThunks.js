import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { loadPosts } from '../postsSlice';
import { loadNotifications } from '../notificationsSlice.js';
import { loadQueue } from '../dmQueueSlice';


export const saveGlobalState = () => async (_dispatch, getState) => {
  const { auth, posts, notifications, dmQueue } = getState();
  if (!auth.uid) return;

  const payload = {
    posts: posts.listArray,
    notifications: notifications.stackArray,
    dmQueue: dmQueue.queueArray,
  };

  const ref = doc(db, 'states', auth.uid);
  await setDoc(ref, payload, { merge: true });
};


export const loadGlobalState = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.uid) return;

  const ref = doc(db, 'states', auth.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    dispatch(loadPosts(data.posts ?? []));
    dispatch(loadNotifications(data.notifications ?? []));
    dispatch(loadQueue(data.dmQueue ?? []));
  } else {
    
    dispatch(loadPosts([]));
    dispatch(loadNotifications([]));
    dispatch(loadQueue([]));
  }
};
