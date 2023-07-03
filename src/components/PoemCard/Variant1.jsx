import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateString from '@/components/DateString'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component named `Variant1`. It is a variant of the
PoemCard component. */
export default function Variant1 ({ poem }) {
  return (
    <Container
      maxWidth='sm'
      sx={{
        transition: 'background-color 0.5s ease',
        width: 1,
        height: 'fit-content',
        backgroundColor: 'white.main',
        padding: 2,
        '&:hover': {
          backgroundColor: 'secondary.light'
        }
      }}
    >
      <NextMuiLink
        href={`/poetry/${poem.slug}`}
        sx={{ textDecoration: 'none', color: 'dark.main' }}
      >
        <Stack spacing={3}>
          <Typography
            variant='h6'
            component='h3'
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {poem.content.title}
          </Typography>
          <Typography
            variant='body1'
            component='p'
            color='text.secondary'
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {poem.content.summary}
          </Typography>
          <DateString date={poem.published_at || poem.created_at} />{' '}
        </Stack>
      </NextMuiLink>
    </Container>
  )
}
