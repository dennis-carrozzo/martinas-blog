import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'

/* The code is defining a React functional component called "Text". It is a variant of the Hero
Component */
export default function Text ({ blok }) {
  const bgElement = useRef()
  const titleElement = useRef()
  const lineElement = useRef()
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
        "<span class='hero_text-letter'>$&</span>"
      )

      anime
        .timeline()
        .add({
          targets: bgElement.current,
          top: 0,
          easing: 'easeOutExpo'
        })
        .add(
          {
            targets: '.hero_text-letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: 'easeOutExpo',
            delay: (el, i) => 30 * (i + 1)
          },
          '-=500'
        )
        .add(
          {
            targets: '.hero-text--stagger-reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
        .add(
          {
            targets: lineElement.current,
            width: 75,
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
      sx={{
        position: 'relative'
      }}
    >
      <Box
        ref={bgElement}
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: '-100%',
          left: 0,
          width: 1,
          height: 1,
          backgroundColor: 'primary.light'
        }}
      />
      <Container
        disableGutters
        maxWidth='xl'
        sx={{
          position: 'relative',
          width: 1,
          minHeight: '90vh',
          paddingBlock: { xs: 12, sm: 'unset' },
          paddingTop: { sm: 25 },
          paddingBottom: 15,
          paddingInline: { xs: 2, sm: 0 }
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          spacing={5}
          sx={{ color: 'black' }}
        >
          <Typography
            ref={titleElement}
            variant='h3'
            component='h1'
            sx={{ opacity: 0, maxWidth: 'md', textAlign: { sm: 'center' } }}
          >
            {blok.title}
          </Typography>
          <Typography
            variant='subtitle2'
            component='p'
            className='hero-text--stagger-reveal'
            sx={{
              opacity: 0,
              maxWidth: 'sm',
              textAlign: { sm: 'center' },
              position: 'relative'
            }}
          >
            <Box
              component='span'
              ref={lineElement}
              sx={{
                transform: 'translateX(-50%)',
                position: 'absolute',
                bottom: -20,
                left: '50%',
                width: 0,
                height: 2,
                backgroundColor: 'dark.main'
              }}
            />
            {blok.content}
          </Typography>
        </Stack>
      </Container>
    </Stack>
  )
}
