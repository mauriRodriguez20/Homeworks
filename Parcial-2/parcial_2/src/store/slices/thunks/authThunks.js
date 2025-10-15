import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { checkingCredentials, login, logout } from '../authSlice';


export const checkAuthState = () => (dispatch) => {
  dispatch(checkingCredentials());
  onAuthStateChanged(auth, (user) => {
    if (user) dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName }));
    else dispatch(logout());
  });
};

export const startRegister = ({ email, password, displayName }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials());
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    dispatch(login({ uid: user.uid, email: user.email, displayName }));
  } catch (err) {
    console.error('Register error:', err);     
    dispatch(logout(err.message));               
  }
};


export const startLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials());
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName }));
  } catch (err) { dispatch(logout(err.message)); }
};

export const startLogout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};
