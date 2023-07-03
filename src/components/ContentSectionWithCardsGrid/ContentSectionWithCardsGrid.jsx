import { useEffect, useRef } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '@/components/NextMuiLink'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `ContentSectionWithCardsGrid`. This
component takes a prop called `blok`, which is an object holding storyblok CMS data. */
export default function ContentSectionWithCardsGrid ({ blok }) {
  const squareElement = useRef()
  const titleElement = useRef()
  /* colors to use in categories card grid */
  const categoryGridColorArray = [
    'primary.dark',
    'secondary.light',
    'secondary.dark',
    'primary.light'
  ]
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { ref, inView } = useInView({
    threshold: isSmallScreen ? 0.2 : 0.3,
    triggerOnce: true
  })

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (inView) {
      titleElement.current.style.opacity = 1
      titleElement.current.innerHTML = titleElement.current.textContent.replace(
        /\S/g,
        "<span class='content_section_with_cards_grid-letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          targets: squareElement.current,
          left: -50,
          easing: 'easeOutExpo'
        })
        .add({
          targets: '.content_section_with_cards_grid-letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 600,
          delay: (el, i) => 30 * (i + 1)
        })
        .add(
          {
            targets: '.content_section_with_cards_grid-cards--stagger_reveal',
            delay: anime.stagger(100),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
        .add(
          {
            targets: '.content_section_with_cards_grid-content--stagger_reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1500'
        )
    }
  }, [inView])

  return (
    <Container
      maxWidth='lg'
      sx={{
        paddingTop: 5,
        paddingBottom: { xs: 5, sm: 15 },
        paddingInline: { xs: 2, sm: 10 }
      }}
      {...storyblokEditable(blok)}
      ref={ref}
    >
      <Grid
        container
        spacing={{ xs: 10, sm: 20, md: 3 }}
        justifyContent='center'
        alignItems='center'
      >
        {/* Cards */}
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={3}
            sx={{
              position: 'relative'
            }}
          >
            <Box
              ref={squareElement}
              sx={{
                position: 'absolute',
                zIndex: -1,
                top: 200,
                left: '-100%',
                width: 450,
                height: 300,
                backgroundColor: 'accent.main'
              }}
            />
            {blok.categoriesCards[0] &&
              blok.categoriesCards.map((category, i) => (
                <Grid item xs={12} sm={6} key={category.title}>
                  <Stack
                    component={Paper}
                    className='content_section_with_cards_grid-cards--stagger_reveal'
                    sx={{
                      opacity: 0,
                      transform: {
                        sm: `translateY(${i % 2 !== 0 ? '100px' : '0'})`
                      },
                      paddingBlock: 3,
                      paddingInline: 2
                    }}
                    spacing={2}
                  >
                    <Box
                      sx={{
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        backgroundColor: categoryGridColorArray[i]
                      }}
                    />
                    <Typography
                      variant='h5'
                      className='content_section_with_cards_grid-cards--stagger_reveal'
                      sx={{ opacity: 0 }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {category.subtitle}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Grid>
        {/* Content */}
        <Stack component={Grid} item xs={12} md={6} spacing={3}>
          <Typography
            variant='button'
            color='accent.main'
            className='content_section_with_cards_grid-content--stagger_reveal'
            sx={{ opacity: 0 }}
          >
            {blok.headline}
          </Typography>
          <Typography variant='h4' ref={titleElement} sx={{ opacity: 0 }}>
            {blok.title}
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            className='content_section_with_cards_grid-content--stagger_reveal'
            sx={{ opacity: 0 }}
          >
            {blok.content}
          </Typography>
          <NextMuiLink
            href={blok.link.cached_url}
            className='content_section_with_cards_grid-content--stagger_reveal'
            sx={{ opacity: 0 }}
          >
            <Button variant='contained'>{blok.linkText}</Button>
          </NextMuiLink>
        </Stack>
      </Grid>
    </Container>
  )
}
