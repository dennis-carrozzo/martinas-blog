import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '@/components/NextMuiLink'
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `Variant2`. It is the second variant of
the ContentSection component. */
export default function Variant2 ({ blok }) {
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
        "<span class='letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          targets: '.content_section-variant2--stagger-reveal',
          delay: anime.stagger(200),
          left: 0
        })
        .add(
          {
            targets: '.letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: 'easeOutExpo',
            duration: 600,
            delay: (el, i) => 70 * (i + 1)
          },
          300
        )
    }
  }, [inView])

  return (
    <Container
      ref={ref}
      maxWidth='lg'
      sx={{
        minHeight: '100vh',
        paddingBlock: { xs: 10, sm: 15 },
        paddingInline: { xs: 4, sm: 10 }
      }}
    >
      <Grid container spacing={5} alignItems='center'>
        <Stack
          component={Grid}
          xs={12}
          sm={5}
          item
          spacing={2}
          sx={{ overflow: 'hidden' }}
        >
          <Typography
            variant='subtitle1'
            className='content_section-variant2--stagger-reveal'
            sx={{ position: 'relative', left: '-130%' }}
          >
            {blok.subtitle}
          </Typography>
          <Typography
            color='text.secondary'
            className='content_section-variant2--stagger-reveal'
            sx={{ position: 'relative', left: '-130%' }}
          >
            {blok.content}
          </Typography>
          <NextMuiLink
            to={blok.ctaLink.cached_url}
            className='content_section-variant2--stagger-reveal'
            sx={{ position: 'relative', left: '-130%' }}
          >
            <Button variant='contained'>{blok.ctaText}</Button>
          </NextMuiLink>
        </Stack>
        <Stack component={Grid} xs={12} sm={7} item>
          <Stack
            sx={{
              backgroundColor: 'primary.dark',
              paddingTop: { xs: 10, sm: 0 },
              paddingLeft: { sm: 10, md: 20 }
            }}
          >
            <Stack
              justifyContent='center'
              alignItems='center'
              spacing={7}
              sx={{
                overflow: 'hidden',
                height: { sm: 400 },
                backgroundColor: 'secondary.light',
                paddingBlock: 3
              }}
            >
              <Typography
                ref={titleElement}
                variant='h4'
                compoonent='h2'
                sx={{ opacity: 0 }}
              >
                {blok.title}
              </Typography>
              <Box
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                  borderRadius: '50%',
                  width: { xs: 200, sm: 250 },
                  height: { xs: 200, sm: 250 }
                }}
              >
                <Image
                  src={blok.image.filename}
                  alt={blok.image.alt}
                  fill
                  sizes='(max-width: 768px) 200px,  250px'
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Container>
  )
}
