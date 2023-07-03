import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called `AuthorSnippet`. It takes three props:
`name`, `about`, and `avatar`. Inside the component, it returns a JSX structure that represents the
UI for displaying information about an author. */
export default function AuthorSnippet ({ name, about, avatar }) {
  return (
    <Container maxWidth='xs' disableGutters>
      <Grid container spacing={3}>
        {/* Avatar */}
        <Grid item xs={12} sm={2}>
          <Avatar
            src={avatar.filename}
            alt={avatar.alt}
            sx={{ marginTop: { sm: '50%' }, width: 50, height: 50 }}
          />
        </Grid>
        {/* Content */}
        <Grid item xs={12} sm={10}>
          <Stack spacing={1}>
            <Typography variant='h6'>{name}</Typography>
            <Typography variant='caption' color='text.secondary'>
              {about}
            </Typography>
            <NextMuiLink href='/about' sx={{ textDecoration: 'none' }}>
              <Button size='small' variant='text'>
                read more about lucy
              </Button>
            </NextMuiLink>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
