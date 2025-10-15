import { useEffect, useState, useCallback } from 'react'
import { db } from '../../firebase/config'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp
} from 'firebase/firestore'

export function useCollection(collectionName) {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const colRef = collection(db, collectionName)
    const unsub = onSnapshot(colRef, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setDocs(rows); setLoading(false)
    }, (err) => { setError(err.message); setLoading(false) })
    return () => unsub()
  }, [collectionName])

  const add = useCallback(async (data) => {
    await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() })
  }, [collectionName])

  const update = useCallback(async (id, data) => {
    await updateDoc(doc(db, collectionName, id), data)
  }, [collectionName])

  const remove = useCallback(async (id) => {
    await deleteDoc(doc(db, collectionName, id))
  }, [collectionName])

  return { docs, loading, error, add, update, remove }
}
