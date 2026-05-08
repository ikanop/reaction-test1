import { useState, useEffect, useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import { useReactionTest } from '../components/ReactionTest/useReactionTest'
import { ReactionTestShell } from '../components/ReactionTest/ReactionTestShell'

export function SinglePlayer({ playerKey = ' ' }) {
  const { status, setStatus, startTimeRef } = useReactionTest()
  const [reactionTime, setReactionTime] = useState(null)
  const [results, setResults] = useState([])

  const handleInteract = useCallback(() => {
    if (status === 'idle') {
      setStatus('waiting')
    } else if (status === 'waiting') {
      setStatus('early')
      setReactionTime(null)
    } else if (status === 'early') {
      setStatus('waiting')
    } else if (status === 'ready') {
      const rt = Date.now() - startTimeRef.current
      setReactionTime(rt)
      setResults(prev => [rt, ...prev].slice(0, 5))
      setStatus('result')
    } else if (status === 'result') {
      setStatus('waiting')
      setReactionTime(null)
    }
  }, [status, setStatus, startTimeRef])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === playerKey) {
        e.preventDefault()
        handleInteract()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleInteract, playerKey])

  const messages = {
    idle: 'Reaction Time Test',
    waiting: 'Wait for green...',
    ready: 'Click!',
    result: `${reactionTime} ms`,
    early: 'Too early!',
  }

  return (
    <ReactionTestShell status={status} onClick={handleInteract}>
      <Box
        sx={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {results.map((result, index) => (
          <Typography variant="h2" key={index}>
            {index + 1}. {result} ms
          </Typography>
        ))}
      </Box>
      <Typography variant="h1" fontWeight="500">
        {messages[status]}
      </Typography>
    </ReactionTestShell>
  )
}
