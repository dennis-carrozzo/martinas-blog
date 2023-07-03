import { useEffect, useRef } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import { render } from 'storyblok-rich-text-react-renderer'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme/theme'
import AuthorSnippet from '@/components/AuthorSnippet'
import DateString from '@/components/DateString'
import PoemCard from '@/components/PoemCard'

/* The below code is a React component. It exports a default function called
"Poem" that takes a prop called "blok" and renders a Storyblok Poem blok. */
export default function Poem ({ blok }) {
  const titleElement = useRef()
  const featuredPoemsTitleElement = useRef()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [contentRef, contentInView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })
  const [featuredPoemsRef, featuredPoemsInView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (contentInView) {
      titleElement.current.style.opacity = 1
      titleElement.current.innerHTML = titleElement.current.textContent.replace(
        /\S/g,
        "<span class='poem-title-letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          targets: '.poem-title-letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          delay: (el, i) => 60 * (i + 1)
        })
        .add(
          {
            targets: '.poem-content--reveal',
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
    }
  }, [contentInView])

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (featuredPoemsInView) {
      featuredPoemsTitleElement.current.style.opacity = 1
      featuredPoemsTitleElement.current.innerHTML =
        featuredPoemsTitleElement.current.textContent.replace(
          /\S/g,
          "<span class='featured_poems-title-letter'>$&</span>"
        )
      anime
        .timeline()
        .add({
          targets: '.featured_poems-title-letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 600,
          delay: (el, i) => 30 * (i + 1)
        })
        .add(
          {
            targets: '.featured_poems--stagger-reveal',
            opacity: 1,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
          },
          '-=500'
        )
    }
  }, [featuredPoemsInView])

  return (
    <>
      <Container
        {...storyblokEditable(blok)}
        maxWidth='md'
        sx={{
          width: 1,
          paddingBlock: 20
        }}
      >
        <Grid container spacing={{ xs: 5, sm: 10, md: 3 }}>
          <Grid
            ref={contentRef}
            item
            xs={12}
            sm={10}
            md={7}
            sx={{ position: 'relative', backgroundColor: 'white.main' }}
          >
            <Typography
              ref={titleElement}
              variant='h2'
              component='h1'
              sx={{
                opacity: 0,
                position: 'relative',
                zIndex: 2
              }}
            >
              {blok.title}
            </Typography>
            <Box
              className='poem-content--reveal'
              sx={{
                opacity: 0,
                position: 'absolute',
                zIndex: 1,
                top: 0,
                right: 25,
                borderRadius: '50%',
                width: 200,
                height: 200,
                backgroundColor: 'primary.light',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  zIndex: 3,
                  top: 0,
                  right: 0,
                  border: '1px solid black',
                  borderRadius: '50%',
                  width: 50,
                  height: 50
                }
              }}
            />
            <Divider
              className='poem-content--reveal'
              sx={{ opacity: 0, position: 'relative', zIndex: 2 }}
            />
            <Box className='poem-content--reveal' sx={{ opacity: 0 }}>
              <DateString date={blok.published_at || blok.created_at} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            className='poem-content--reveal'
            sx={{ opacity: 0 }}
          >
            {render(blok.content)}
          </Grid>
          {/* Author snippet */}
          {!!blok.author[0].name && (
            <Grid item xs={12} sm={8} md={12}>
              <Divider sx={{ marginBottom: 3 }} />
              <AuthorSnippet
                name={blok.author[0].name}
                avatar={blok.author[0].avatar}
                about={blok.author[0].about}
              />
              <Divider sx={{ marginTop: 3 }} />
            </Grid>
          )}
          {/* Featured Poems */}
          {!!blok.featuredPoems[0] && (
            <Grid ref={featuredPoemsRef} item xs={12} sx={{ marginTop: 5 }}>
              <Typography
                ref={featuredPoemsTitleElement}
                variant='h4'
                component='h2'
                sx={{ marginBlock: 2, opacity: 0 }}
              >
                Other Poems You May Like
              </Typography>
              <Grid container spacing={3} sx={{ marginTop: 2 }}>
                {blok.featuredPoems.map(poem => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={poem.uuid}
                    className='featured_poems--stagger-reveal'
                    sx={{ opacity: 0 }}
                  >
                    <PoemCard poem={poem} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
      {/* Newsletter subscription form */}
      <Stack justifyContent='center' alignItems='center'>
        <StoryblokComponent blok={blok.newsLetterFormSection[0]} />
      </Stack>
    </>
  )
}
