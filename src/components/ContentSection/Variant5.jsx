import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'

/* The code is exporting a React component called "Variant5" as the default export. It is the fifth variant of
the ContentSection component. */
export default function Variant5 ({ blok }) {
  const squareElement = useRef()
  const imageElement = useRef()
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
        "<span class='content_section-variant5-letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          targets: squareElement.current,
          left: '-50%',
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
        .add(
          {
            targets: '.content_section-variant5-letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: 'easeOutExpo',
            duration: 600,
            delay: (el, i) => 70 * (i + 1)
          },
          '-=1000'
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
      <Grid container spacing={5}>
        <Stack component={Grid} xs={12} sm={6} item spacing={2}>
          <Typography
            ref={titleElement}
            variant='h3'
            component='h2'
            sx={{ opacity: 0 }}
          >
            {blok.title}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              position: 'relative'
            }}
          >
            <Box
              ref={squareElement}
              component='span'
              sx={{
                position: 'absolute',
                zIndex: -1,
                top: 50,
                left: '-300%',
                width: '200%',
                height: 200,
                backgroundColor: 'secondary.light'
              }}
            />
            {blok.content}
          </Typography>
        </Stack>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              position: 'relative',
              width: { xs: 1, md: 400 },
              height: { xs: 400, sm: 500 },
              '&:before': {
                content: '""',
                position: 'absolute',
                zIndex: -1,
                top: '-100px',
                right: '-100px',
                borderRadius: '50%',
                width: 200,
                height: 200,
                backgroundColor: 'accent.main'
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                zIndex: -1,
                top: 'calc(100% + 10px)',
                left: 0,
                width: '50%',
                height: 5,
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
      </Grid>
    </Container>
  )
}
