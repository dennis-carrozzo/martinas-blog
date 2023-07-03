import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'

/* The code is defining a React functional component called "WithImage". It is a variant of the Hero
Component */
export default function WithImage ({ blok }) {
  const { ref, inView } = useInView({
    triggerOnce: true
  })
  const imageElement = useRef()
  const textBoxElement = useRef()
  const titleElement = useRef()
  const lineElement = useRef()

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (inView) {
      anime
        .timeline()
        .add({
          targets: imageElement.current,
          opacity: 1,
          scale: 1.2,
          easing: 'easeInOutQuad'
        })
        .add(
          {
            targets: textBoxElement.current,
            opacity: 1,
            easing: 'easeInOutQuad'
          },
          '-=500'
        )
        .add(
          {
            targets: titleElement.current,
            opacity: 1,
            easing: 'easeInOutQuad'
          },
          '-=500'
        )
        .add(
          {
            targets: lineElement.current,
            width: 100,
            easing: 'easeInOutQuad'
          },
          '-=750'
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
        disableGutters
        maxWidth='xl'
        sx={{
          overflow: 'hidden',
          position: 'relative',
          width: 1,
          height: '100vh'
        }}
      >
        <Image
          ref={imageElement}
          src={blok.image.filename}
          alt={blok.image.alt}
          fill
          quality={100}
          style={{ objectFit: 'contain', opacity: 0 }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <Box
          ref={textBoxElement}
          sx={{
            opacity: 0,
            transform: { xs: 'translateX(50%)', lg: 'unset' },
            position: 'absolute',
            zIndex: 10,
            bottom: { xs: '-5%', sm: '50%', md: 20 },
            right: { xs: '50%', lg: 40 },
            width: { xs: 0.8, md: 0.7, lg: 0.4 },
            backgroundColor: 'secondary.light',
            paddingBlock: 5,
            paddingInline: 3,
            color: 'dark.main'
          }}
        >
          <Typography
            ref={titleElement}
            component='h1'
            variant='h4'
            align='center'
            sx={{
              opacity: 0,
              position: 'relative'
            }}
          >
            <Box
              ref={lineElement}
              component='span'
              sx={{
                transform: 'translateX(-50%)',
                position: 'absolute',
                top: -10,
                left: '50%',
                width: 0,
                height: 2,
                backgroundColor: 'dark.main'
              }}
            />
            {blok.content}
          </Typography>
        </Box>
      </Container>
    </Stack>
  )
}
