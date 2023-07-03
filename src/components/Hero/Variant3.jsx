import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'

/* The code is defining a React functional component called "Variant3". It is a variant of the Hero
Component */
export default function Variant3 ({ blok }) {
  const circleElement = useRef()
  const titleElement = useRef()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { ref, inView } = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (inView) {
      titleElement.current.style.opacity = 1
      titleElement.current.innerHTML = titleElement.current.textContent.replace(
        /\S/g,
        "<span class='hero_variant3-letter'>$&</span>"
      )

      anime
        .timeline()
        .add({
          targets: '.hero_variant3-letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 600,
          delay: (el, i) => 30 * (i + 1)
        })
        .add(
          {
            targets: '.hero-variant_3--stagger_reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
        .add(
          {
            targets: circleElement.current,
            width: 150,
            height: 150,
            // duration: 1500,
            easing: 'easeOutExpo'
          },
          '-=500'
        )
    }
  }, [inView])

  return (
    <Container
      maxWidth='lg'
      sx={{ paddingTop: 20, paddingBottom: { xs: 10, sm: 20 } }}
      ref={ref}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        alignItems='center'
      >
        <Stack sx={{ width: { xs: 1, sm: 0.4 } }} spacing={3}>
          <Box
            sx={{
              position: 'relative',
              paddingTop: 2,
              '&:before': {
                content: '""',
                position: 'absolute',
                width: 0.5,
                height: '2px',
                top: 0,
                left: 0,
                backgroundColor: 'white.main'
              }
            }}
          >
            <Box
              ref={circleElement}
              className='hero-variant_3--stagger_reveal'
              sx={{
                opacity: 0,
                position: 'absolute',
                zIndex: -1,
                top: '-40%',
                left: '-20%',
                borderRadius: '50%',
                width: 0,
                height: 0,
                backgroundColor: 'primary.main'
              }}
            />
            <Typography
              ref={titleElement}
              variant='h4'
              component='h1'
              sx={{ opacity: 0 }}
            >
              {blok.title}
            </Typography>
          </Box>
          <Typography
            variant='subtitle1'
            component='p'
            color='text.secondary'
            className='hero-variant_3--stagger_reveal'
            sx={{ opacity: 0 }}
          >
            {blok.content}
          </Typography>
        </Stack>
        <Box
          sx={{
            position: 'relative',
            width: { xs: 1, sm: 0.5 },
            height: { xs: '50vh', sm: 400 }
          }}
        >
          <Image
            src={blok.image.filename}
            alt={blok.image.alt}
            fill
            sizes='(max-width: 768px) 100vw, 400px'
            className='hero-variant_3--stagger_reveal'
            style={{ opacity: 0 }}
          />
        </Box>
      </Stack>
    </Container>
  )
}
