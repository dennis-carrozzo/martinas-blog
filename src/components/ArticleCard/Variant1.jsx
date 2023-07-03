import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import HourglassBottom from '@mui/icons-material/HourglassBottom'
import DateString from '@/components/DateString'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called `Variant1`. It takes an object `article` as
a parameter. It is a variant for the ArticleCard component */
export default function Variant1 ({ article }) {
  return (
    <Container
      maxWidth='xs'
      sx={{
        transition: 'background-color 0.2s ease',
        width: 1,
        height: 'auto',
        backgroundColor: 'white.main',
        padding: '0 !important',
        '&:hover': {
          backgroundColor: 'secondary.main',
          '&>.MuiBox-root>img': {
            transform: 'scale(1.2)'
          }
        }
      }}
    >
      {/* Image */}
      <Box
        sx={{ overflow: 'hidden', position: 'relative', width: 1, height: 200 }}
      >
        <Image
          src={article.content?.image?.filename}
          alt={article.content?.image?.alt}
          fill
          sizes='(max-width: 768px) 250px,  300px'
          style={{
            transition: 'transform 0.5s ease',
            objectFit: 'cover'
          }}
        />
        {/* Category */}
        {!!article.tag_list[0] && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 5,
              left: 0,
              bottom: 0,
              backgroundColor: 'accent.main',
              paddingInline: 1,
              paddingBlock: 0.5,
              color: 'white.main'
            }}
          >
            <Typography variant='subtitle2' component='p'>
              {article.tag_list[0]}
            </Typography>
          </Box>
        )}
      </Box>
      {/* Content */}
      <Stack sx={{ padding: 1.5 }}>
        <Typography variant='h5' component='h3'>
          {article.content.title}
        </Typography>
        <Typography variant='subtitle1' component='p' color='text.primary'>
          {article.content.subtitle}
        </Typography>
        <DateString date={article.published_at || article.created_at} />
        {/* Reading Time and CTA */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{
            marginTop: 3,
            paddingInline: '0 !important',
            color: 'secondary.light'
          }}
        >
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            sx={{ color: 'text.secondary' }}
          >
            <HourglassBottom sx={{ width: 15, height: 15 }} />
            <Typography variant='caption'>
              {article.content.readingTime} Read
            </Typography>
          </Stack>
          <NextMuiLink href={`/blog/${article.slug}`}>
            <Button variant='outlined' size='small' color='accent'>
              Read Full Article
            </Button>
          </NextMuiLink>
        </Stack>
      </Stack>
    </Container>
  )
}
