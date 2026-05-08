import { useState, useEffect, useRef } from 'react'

export function useReactionTest() {
  const [status, setStatus] = useState('idle')
  const startTimeRef = useRef(null)

  useEffect(() => {
    let timer
    if (status === 'waiting') {
      const delay = Math.random() * 2000 + 1000
      timer = setTimeout(() => {
        setStatus('ready')
        startTimeRef.current = Date.now()
      }, delay)
    }
    return () => clearTimeout(timer)
  }, [status])

  return { status, setStatus, startTimeRef }
}
