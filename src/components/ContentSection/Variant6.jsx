import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NextMuiLink from '@/components/NextMuiLink'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `Variant6`. It is the sixth variant of
the ContentSection component. */
export default function Variant6 ({ blok }) {
  const squareElement = useRef()
  const imageElement = useRef()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { ref, inView } = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (inView) {
      anime
        .timeline()
        .add({
          targets: squareElement.current,
          height: 350,
          easing: 'easeOutExpo'
        })
        .add(
          {
            targets: imageElement.current,
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=500'
        )
    }
  }, [inView])

  return (
    <Container
      maxWidth='lg'
      sx={{
        paddingBlock: { xs: 10, sm: 15 },
        paddingInline: { xs: 2, sm: 10 }
      }}
      ref={ref}
    >
      <Grid container spacing={5} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              position: 'relative',
              width: { xs: 1, lg: 400 },
              height: { xs: 300, sm: 400 },
              '&:before': {
                content: '""',
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                borderRadius: '50%',
                width: 200,
                height: 200,
                backgroundColor: 'primary.dark'
              }
            }}
          >
            <Image
              ref={imageElement}
              src={blok.image.filename}
              alt={blok.image.alt}
              fill
              sizes='(max-width: 425px) 250px, 400px'
              style={{ objectFit: 'cover', opacity: 0 }}
            />
          </Box>
        </Grid>
        <Stack component={Grid} xs={12} sm={6} item spacing={2}>
          <Typography
            variant='h6'
            sx={{
              position: 'relative',
              width: { md: 350 }
            }}
          >
            <Box
              ref={squareElement}
              sx={{
                display: { xs: 'none', sm: 'block' },
                position: 'absolute',
                zIndex: -1,
                top: { sm: '-50%', md: '-100%' },
                right: '-75%',
                width: 400,
                height: 0,
                backgroundColor: 'primary.light'
              }}
            />
            {blok.content}
          </Typography>
          <NextMuiLink href={blok.ctaLink.cached_url}>
            <Button variant='contained'>{blok.ctaText}</Button>
          </NextMuiLink>
        </Stack>
      </Grid>
    </Container>
  )
}
