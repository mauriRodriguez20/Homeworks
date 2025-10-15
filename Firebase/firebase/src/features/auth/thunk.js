import { auth } from '../../firebase/config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { checkingCredentials, loginSuccess, logout } from './authSlice'

export const registerWithEmailPassword = ({ email, password, displayName }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials())
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName })
    const { uid, photoURL } = cred.user
    dispatch(loginSuccess({ uid, email, displayName, photoURL: photoURL ?? null }))
  } catch (err) {
    dispatch(logout(err.message))
  }
}

export const loginWithEmailPassword = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials())
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const { uid, email: e, displayName, photoURL } = user
    dispatch(loginSuccess({ uid, email: e, displayName, photoURL: photoURL ?? null }))
  } catch (err) {
    dispatch(logout(err.message))
  }
}

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch(checkingCredentials())
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    const { uid, email, displayName, photoURL } = user
    dispatch(loginSuccess({ uid, email, displayName, photoURL: photoURL ?? null }))
  } catch (err) {
    dispatch(logout(err.message))
  }
}

export const logoutFirebase = () => async (dispatch) => {
  try {
    await signOut(auth)
    dispatch(logout())
  } catch (err) {
    dispatch(logout(err.message))
  }
}
