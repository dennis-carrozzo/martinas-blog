import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import ArticleCard from '@/components/ArticleCard'
import ArticlesList from './ArticlesList'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `FeaturedArticles`. This
component takes a prop called `blok`, which is an object holding storyblok CMS data. */
export default function FeaturedArticles ({ blok }) {
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
          targets: '.letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          delay: (el, i) => 70 * (i + 1)
        })
        .add(
          {
            targets: '.featured_articles--stagger_reveal',
            delay: anime.stagger(200),
            opacity: 1,
            easing: 'easeOutExpo'
          },
          600
        )
    }
  }, [inView])

  return (
    <Stack
      ref={ref}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'secondary.light' }}
    >
      <Container
        maxWidth='lg'
        sx={{
          paddingBlock: { xs: 10, sm: 12 },
          paddingInline: { xs: 2, sm: 10, md: 15 }
        }}
      >
        {/* title */}
        <Typography
          variant='h2'
          component='h2'
          color='dark.main'
          sx={{
            opacity: 0,
            position: 'relative',
            marginBottom: 5,
            width: 'fit-content'
          }}
          ref={titleElement}
        >
          Featured Articles
        </Typography>
        <Stack
          spacing={3}
          alignItems='center'
          justifyContent={{ xs: 'center', sm: 'space-around' }}
          direction={{ sm: 'row' }}
        >
          <Stack sx={{ marginBottom: { xs: 5, sm: 0 } }}>
            {/* Main Article */}
            <Box
              sx={{ minWidth: 300, maxWidth: 350, opacity: 0 }}
              className='featured_articles--stagger_reveal'
            >
              <ArticleCard article={blok.mainArticle} />
            </Box>
          </Stack>
          {/* Articles List */}
          <ArticlesList
            articles={blok.articles}
            className='featured_articles--stagger_reveal'
            sx={{ opacity: 0 }}
            inView={inView}
          />
        </Stack>
      </Container>
    </Stack>
  )
}
