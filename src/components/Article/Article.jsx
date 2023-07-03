import { useEffect, useRef } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import { render } from 'storyblok-rich-text-react-renderer'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArticleCard from '@/components/ArticleCard'
import AuthorSnippet from '@/components/AuthorSnippet'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import DateString from '@/components/DateString'
import theme from '@/theme/theme'

/* The below code is a React component. It exports a default function called
"Article" that takes a prop called "blok" and renders a Storyblok Article blok. */
export default function Article ({ blok }) {
  const bgSquareElement = useRef()
  const fgSquareElement = useRef()
  const titleElement = useRef()
  const imageElement = useRef()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [heroRef, heroInView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })
  const [contentRef, contentInView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })
  const [featuredArticlesRef, featuredArticlesInView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (heroInView) {
      anime
        .timeline()
        .add({
          targets: bgSquareElement.current,
          top: 0,
          easing: 'easeOutExpo'
        })
        .add(
          {
            targets: fgSquareElement.current,
            width: '60%',
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
        .add(
          {
            targets: '.article-hero--stagger-reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          '-=750'
        )
        .add(
          {
            targets: imageElement.current,
            scale: 1.2,
            easing: 'easeOutExpo'
          },
          '-=1000'
        )
    }
  }, [heroInView])

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (contentInView) {
      anime({
        targets: '.article-content--stagger-reveal',
        delay: anime.stagger(200),
        opacity: 1,
        easing: 'easeOutExpo'
      })
    }
  }, [contentInView])

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (featuredArticlesInView) {
      titleElement.current.style.opacity = 1
      titleElement.current.innerHTML = titleElement.current.textContent.replace(
        /\S/g,
        "<span class='article-featured_articles-letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          targets: '.article-featured_articles-letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 600,
          delay: (el, i) => 30 * (i + 1)
        })
        .add(
          {
            targets: '.article-featured_articles--stagger-reveal',
            opacity: 1,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
          },
          '-=500'
        )
    }
  }, [featuredArticlesInView])

  return (
    <>
      <Container
        maxWidth='md'
        sx={{
          paddingTop: { xs: 10, sm: 15 },
          paddingBottom: { xs: 0, sm: 15 }
        }}
        {...storyblokEditable(blok)}
      >
        <Grid container>
          {/* Hero section */}
          <Grid item xs={12} ref={heroRef}>
            <Box
              sx={{
                position: 'relative',
                width: 0.8,
                minHeight: { xs: 200, sm: 350 }
              }}
            >
              <Box
                sx={{
                  overflow: 'hidden',
                  position: 'absolute',
                  top: '30%',
                  right: '-20%',
                  width: 1,
                  height: 1
                }}
              >
                <Box
                  ref={bgSquareElement}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '-100%',
                    width: 1,
                    height: 1,
                    backgroundColor: 'secondary.main'
                  }}
                />
              </Box>
              <Box
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                  width: 0.8,
                  minHeight: { xs: 200, sm: 350 }
                }}
              >
                <Image
                  ref={imageElement}
                  src={blok.image.filename}
                  alt={blok.image.alt}
                  fill
                  sizes='(max-width: 768px) 250px,  40vw'
                  className='article-hero--stagger-reveal'
                  style={{
                    opacity: 0,
                    zIndex: 4,
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Box>
          </Grid>
          {/* Content Section */}
          <Grid item xs={12} sm={10}>
            <Stack spacing={4} sx={{ paddingBlock: 2 }}>
              <Box
                ref={fgSquareElement}
                sx={{
                  position: 'relative',
                  zIndex: 5,
                  marginLeft: 'auto',
                  width: 0,
                  height: { xs: 150 },
                  backgroundColor: 'secondary.light'
                }}
              />
              {!!blok.tag_list[0] && (
                <Typography
                  variant='h5'
                  color='accent.main'
                  className='article-content--stagger-reveal'
                  sx={{
                    opacity: 0,
                    borderTopColor: 'accent.main',
                    borderTopWidth: 2,
                    borderTopStyle: 'solid',
                    width: 'fit-content'
                  }}
                >
                  {blok.tag_list[0].toUpperCase()}
                </Typography>
              )}
              <Typography
                variant='h4'
                component='h1'
                className='article-content--stagger-reveal'
                sx={{ opacity: 0 }}
              >
                {blok.title}
              </Typography>
              <Divider ref={contentRef} />
              <Typography
                variant='subtitle1'
                color='text.secondary'
                className='article-content--stagger-reveal'
                sx={{ opacity: 0 }}
              >
                {blok.snippet}
              </Typography>
              <DateString date={blok.published_at || blok.created_at} />
              <Box
                className='article-content--stagger-reveal'
                sx={{ opacity: 0 }}
              >
                {render(blok.content)}
              </Box>
              {!!blok.author && !!blok.author[0].name && (
                <Stack sx={{ paddingBlock: { xs: 1, sm: 5 } }} spacing={3}>
                  <Divider />
                  <AuthorSnippet
                    name={blok.author[0].name}
                    avatar={blok.author[0].avatar}
                    about={blok.author[0].about}
                  />
                  <Divider />
                </Stack>
              )}
            </Stack>
          </Grid>
          {/* Featured Articles */}
          {!!blok.featuredArticles && !!blok.featuredArticles[0] && (
            <Grid ref={featuredArticlesRef} item xs={12} sx={{ marginTop: 10 }}>
              <Typography
                variant='h4'
                component='h2'
                sx={{ opacity: 0, marginBlock: 2 }}
                ref={titleElement}
              >
                Articles You May Like
              </Typography>
              <Grid container spacing={3}>
                {blok.featuredArticles.map(article => (
                  <Grid
                    key={article.uuid}
                    item
                    xs={12}
                    sm={4}
                    className='article-featured_articles--stagger-reveal'
                    sx={{ opacity: 0 }}
                  >
                    <ArticleCard variant='variant2' article={article} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
      {/* Newsletter subscription form */}
      {!!blok.newsLetterFormSection && (
        <Stack justifyContent='center' alignItems='center'>
          <StoryblokComponent blok={blok.newsLetterFormSection[0]} />
        </Stack>
      )}
    </>
  )
}
