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

/* The code is defining a React functional component called `Variant4`. It is the fourth variant of
the ContentSection component. */
export default function Variant4 ({ blok }) {
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
          height: '200vh',
          easing: 'easeOutExpo'
        })
        .add(
          {
            targets: '.content_section-variant_4--stagger',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
    }
  }, [inView])

  return (
    <Container
      ref={ref}
      maxWidth='lg'
      sx={{
        overflow: 'hidden',
        paddingBlock: { xs: 10, sm: 15 },
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
          <Stack
            justifyContent='space-between'
            alignItems='start'
            spacing={3}
            sx={{
              position: 'relative',
              zIndex: 11,
              maxWidth: 'sm',
              backgroundColor: 'white.main',
              paddingBlock: { xs: 4 },
              paddingInline: { xs: 2 }
            }}
          >
            <Typography
              variant='h6'
              component='h2'
              className='content_section-variant_4--stagger'
              sx={{
                opacity: 0,
                position: 'relative',
                zIndex: 10,
                '&:before': {
                  content: '""',
                  display: { xs: 'block', sm: 'none' },
                  transform: 'translate(-50%,-100%)',
                  position: 'absolute',
                  zIndex: 9,
                  top: '-50%',
                  left: '50%',
                  width: 175,
                  height: 100,
                  backgroundColor: 'primary.main'
                }
              }}
            >
              {blok.title}
            </Typography>
            <Typography
              variant='body1'
              className='content_section-variant_4--stagger'
              sx={{
                opacity: 0
              }}
            >
              {blok.content}
            </Typography>
            <NextMuiLink
              to={blok.ctaLink.cached_url}
              className='content_section-variant_4--stagger'
              sx={{
                opacity: 0
              }}
            >
              <Button variant='contained'>{blok.ctaText}</Button>
            </NextMuiLink>
          </Stack>
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
          <Box
            sx={{
              position: 'relative',
              width: { xs: 250, sm: 1, md: 400 },
              height: { xs: 400, sm: 500 }
            }}
          >
            <Box
              sx={{
                width: 1,
                height: 1,
                position: 'relative',
                zIndex: 10
              }}
            >
              <Box
                ref={boxElement}
                sx={{
                  transform: 'translateX(-50%)',
                  position: 'absolute',
                  zIndex: 9,
                  top: -300,
                  left: '50%',
                  width: 175,
                  height: 0,
                  backgroundColor: 'primary.main'
                }}
              />
              <Image
                src={blok.image.filename}
                alt={blok.image.alt}
                fill
                sizes='(max-width: 425px) 250px, 400px'
                className='content_section-variant_4--stagger'
                style={{ objectFit: 'cover', zIndex: 10, opacity: 0 }}
              />
            </Box>
          </Box>
        </Stack>
      </Grid>
    </Container>
  )
}
