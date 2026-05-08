import { Box } from '@mui/material'
import { blue, red, green } from '@mui/material/colors'

const colors = {
  idle: blue[500],
  waiting: red[700],
  ready: green['A400'],
  result: blue[500],
  early: blue[500],
}

export function ReactionTestShell({ status, onClick, children }) {
  return (
    <Box
      onClick={onClick}
      tabIndex={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '94vh',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        background: colors[status] ?? 'gray',
      }}
    >
      {children}
    </Box>
  )
}
