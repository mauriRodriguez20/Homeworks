import { rtdb } from '../../firebase/config'
import { ref, onValue, push } from 'firebase/database'
import { setStatus, setError, setMessages, addLocalMessage } from './firebaseSlice'

export const subscribeMessages = () => (dispatch) => {
  try {
    dispatch(setStatus('loading'))
    const messagesRef = ref(rtdb, 'messages')
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {}
      const list = Object.entries(data).map(([id, v]) => ({ id, ...v }))
      dispatch(setMessages(list))
      dispatch(setStatus('ready'))
    }, (err) => {
      dispatch(setError(err.message))
      dispatch(setStatus('error'))
    })
  } catch (err) {
    dispatch(setError(err.message))
    dispatch(setStatus('error'))
  }
}

export const sendMessage = (messageObj) => async (dispatch) => {
  try {
    await push(ref(rtdb, 'messages'), messageObj)
    dispatch(addLocalMessage(messageObj)) // opcional, para UX inmediata
  } catch (err) {
    dispatch(setError(err.message))
  }
}
