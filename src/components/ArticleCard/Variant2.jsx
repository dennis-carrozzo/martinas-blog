import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateString from '@/components/DateString'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called `Variant2`. It takes an object `article` as
a parameter.It returns the second variant of the ArticleCard component */
export default function Variant2 ({ article }) {
  return (
    <Container
      maxWidth='sm'
      sx={{
        transition: 'background-color 0.5s ease',
        width: 1,
        height: 1,
        backgroundColor: 'white.main',
        padding: '0 !important',
        '&:hover': {
          backgroundColor: 'secondary.light',
          '& img': {
            transform: 'scale(1.2)'
          }
        }
      }}
    >
      <NextMuiLink
        href={`/blog/${article.slug}`}
        sx={{ textDecoration: 'none' }}
      >
        {/* Image */}
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            width: 1,
            height: 200
          }}
        >
          <Image
            src={article.content?.image?.filename}
            alt={article.content?.image?.alt}
            fill
            sizes='(max-width: 768px) 250px,  300px'
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />
        </Box>
        {/* Content */}
        <Stack sx={{ padding: 1.5 }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ marginBlock: 2 }}
          >
            {!!article.tag_list[0] && (
              <Box
                sx={{
                  backgroundColor: 'accent.main',
                  paddingBlock: '5px',
                  paddingInline: 1,
                  color: 'white.main'
                }}
              >
                <Typography variant='subtitle2' component='p'>
                  {article.tag_list[0]}
                </Typography>
              </Box>
            )}
            <Typography
              variant='caption'
              color='accent.main'
              sx={{ marginLeft: 'auto' }}
            >
              {article.content.readingTime} Read
            </Typography>
          </Stack>
          <Typography
            variant='h6'
            component='h3'
            color='text.primary'
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {article.content.title}
          </Typography>
          <Typography
            variant='subtitle2'
            component='p'
            color='text.secondary'
            sx={{
              overflow: 'hidden',
              paddingTop: 1,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {article.content.snippet}
          </Typography>
          <DateString date={article.published_at || article.created_at} />{' '}
        </Stack>
      </NextMuiLink>
    </Container>
  )
}
