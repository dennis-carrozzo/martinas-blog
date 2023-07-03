import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '../NextMuiLink'

// TODO: move content to cms
/**
 * The above function is a React component that renders a footer
 */
export default function Footer () {
  return (
    <Stack
      component='footer'
      justifyContent='center'
      alignItems='center'
      spacing={1}
      sx={{
        position: 'relative',
        backgroundColor: 'dark.main',
        padding: 6,
        color: 'white.main'
      }}
    >
      <Typography
        variant='h6'
        align='center'
        sx={{
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: 'white.main'
        }}
      >
        Martina&apos;s
      </Typography>
      <Typography variant='subtitle2' align='center' component='p'>
        Writer, Mother, Life Lover
      </Typography>
      <Typography
        variant='body2'
        align='center'
        sx={{ position: 'absolute', bottom: 10 }}
      >
        {'Copyright © '}
        <NextMuiLink color='inherit' to='/'>
          martina&apos;s
        </NextMuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Stack>
  )
}
