import { useState, useEffect, useCallback } from 'react'
import { Typography } from '@mui/material'
import { useReactionTest } from '../components/ReactionTest/useReactionTest'
import { ReactionTestShell } from '../components/ReactionTest/ReactionTestShell'

export function DualPlayer({ player1Key = 'z', player2Key = 'm', startKey = ' ' }) {
  const { status, setStatus } = useReactionTest()
  const [winner, setWinner] = useState(null)

  const handleClick = useCallback(() => {
    if (status === 'idle') setStatus('waiting')
  }, [status, setStatus])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isStart = e.key === startKey
      const isP1 = e.key === player1Key
      const isP2 = e.key === player2Key

      if (isStart) {
        if (status === 'idle') {
          setStatus('waiting')
        }
        else if (status === 'result') {
          setWinner(null)
          setStatus('waiting')
        }
        return
      }

      if (!isP1 && !isP2) return

      else if (status === 'waiting') {
        setStatus('early')
      } else if (status === 'early') {
        setStatus('waiting')
      } else if (status === 'ready') {
        setWinner(isP1 ? 'Player 1' : 'Player 2')
        setStatus('result')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [status, setStatus, player1Key, player2Key, startKey])

  const p1Label = player1Key.toUpperCase()
  const p2Label = player2Key.toUpperCase()

  const messages = {
    idle: `${p1Label} vs ${p2Label}`,
    waiting: 'Wait for green...',
    ready: 'GO!',
    result: `${winner} wins!`,
    early: 'Too early!',
  }

  return (
    <ReactionTestShell status={status} onClick={handleClick}>
      <Typography variant="h1" fontWeight="500">
        {messages[status]}
      </Typography>
    </ReactionTestShell>
  )
}
