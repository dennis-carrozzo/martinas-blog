import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NextMuiLink from '@/components/NextMuiLink'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `Variant3`. It is the third variant of
the ContentSection component. */
export default function Variant3 ({ blok }) {
  const boxElement = useRef()
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
          targets: boxElement.current,
          left: 0,
          duration: 1500,
          easing: 'easeOutExpo'
        })
        .add(
          {
            targets: '.content_section-variant_3--stagger_reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
    }
  }, [inView])

  return (
    <Stack
      ref={ref}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'dark.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{
          paddingTop: { xs: 10, sm: 15 },
          paddingBottom: { xs: 0, sm: 15 },
          paddingInline: { xs: 2, sm: 10 }
        }}
      >
        <Grid container spacing={5}>
          <Stack
            component={Grid}
            xs={12}
            sm={6}
            item
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 275, sm: 1, md: 400 },
                height: { xs: 400, sm: 600 }
              }}
            >
              <Box
                ref={boxElement}
                sx={{
                  position: 'absolute',
                  transform: 'translate(-50%,-50%)',
                  zIndex: 9,
                  top: '50%',
                  left: '-100vw',
                  width: '100vw',
                  height: '50%',
                  backgroundColor: 'primary.light'
                }}
              />
              <Box
                className='content_section-variant_3--stagger_reveal'
                sx={{
                  opacity: 0,
                  position: 'relative',
                  zIndex: 10,
                  width: 1,
                  height: 1
                }}
              >
                <Image
                  src={blok.image.filename}
                  alt={blok.image.alt}
                  fill
                  sizes='(max-width: 425px) 275px, 400px'
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Stack>
          <Stack
            component={Grid}
            xs={12}
            sm={6}
            item
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Stack
              justifyContent='space-between'
              alignItems='center'
              spacing={3}
              className='content_section-variant_3--stagger_reveal'
              sx={{
                opacity: 0,
                transform: { xs: 'translateY(-25%)', sm: 'unset' },
                position: 'relative',
                zIndex: 11,
                width: { xs: 250, sm: 1 },
                maxWidth: 'sm',
                backgroundColor: 'white.main',
                paddingBlock: { xs: 4 },
                paddingInline: { xs: 2 },
                '&:before': {
                  content: '""',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  width: 2,
                  height: 1,
                  backgroundColor: 'accent.main'
                }
              }}
            >
              <Typography variant='h6' component='h2' align='center'>
                {blok.title}
              </Typography>
              <Typography variant='body1' align='center'>
                {blok.content}
              </Typography>
              <NextMuiLink to={blok.ctaLink.cached_url}>
                <Button variant='contained'>{blok.ctaText}</Button>
              </NextMuiLink>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}
