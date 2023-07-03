import Button from '@mui/material/Button'
import MuiModal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * This is a React component that renders a modal with a title, content, and a close
 * button.
 */
export default function Modal ({ open, handler, data }) {
  return (
    <Stack
      component={MuiModal}
      justifyContent='center'
      alignItems='center'
      open={open}
      onClose={handler}
      aria-label='confirmation modal'
      sx={{ marginInline: { xs: 2, md: 0 } }}
    >
      <Stack
        component={Paper}
        elevation={10}
        justifyContent='center'
        alignItems='center'
        spacing={3}
        sx={{ padding: 3, maxWidth: { xs: 1, md: 0.8, lg: 0.5 } }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {data.title}
        </Typography>
        <Typography id='modal-modal-description'>{data.content}</Typography>
        <Button variant='outlined' onClick={handler}>
          Close
        </Button>
      </Stack>
    </Stack>
  )
}
