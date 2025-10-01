import { useEffect, useState } from 'react'

export default function LiveClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <p style={{ opacity: 0.8 }}>
      <strong>Ahora:</strong> {now.toLocaleString()}
    </p>
  )
}
