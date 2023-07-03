import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '@/components/NextMuiLink'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `Variant1`. It is the first variant of
the ContentSection component. */
export default function Variant1 ({ blok }) {
  const titleElement = useRef()
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
          targets: titleElement.current,
          top: 0,
          easing: 'easeOutExpo'
        })
        .add(
          {
            targets: '.content_section-variant1--stagger-reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=500'
        )
    }
  }, [inView])

  return (
    <Stack
      ref={ref}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'secondary.main', minHeight: '100vh' }}
    >
      <Container
        maxWidth='lg'
        sx={{
          paddingBlock: { xs: 10, sm: 15 },
          paddingInline: { xs: 4, sm: 10 }
        }}
      >
        <Grid container spacing={5}>
          <Grid xs={12} md={6} item sx={{ overflow: 'hidden' }}>
            <Stack
              ref={titleElement}
              spacing={2}
              sx={{ position: 'relative', top: '-130%' }}
            >
              <Typography variant='h3' compoonent='h2'>
                {blok.title}
              </Typography>
              <Typography
                variant='subtitle2'
                className='content_section-variant1--stagger-reveal'
                sx={{ opacity: 0 }}
              >
                {blok.subtitle}
              </Typography>
              <Box
                className='content_section-variant1--stagger-reveal'
                sx={{
                  opacity: 0,
                  borderRadius: '50%',
                  width: 125,
                  height: 125,
                  backgroundColor: 'primary.light'
                }}
              />
            </Stack>
          </Grid>
          <Stack
            component={Grid}
            xs={12}
            md={6}
            item
            spacing={2}
            className='content_section-variant1--stagger-reveal'
            sx={{ opacity: 0 }}
          >
            <Typography sx={{ maxWidth: 'sm' }}>{blok.content}</Typography>
            <NextMuiLink to={blok.ctaLink.cached_url}>
              <Button variant='contained'>{blok.ctaText}</Button>
            </NextMuiLink>
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}
