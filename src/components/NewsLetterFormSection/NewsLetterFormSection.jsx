import { useEffect } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NewsLetterForm from '@/components/NewsLetterForm'
import theme from '@/theme/theme'

/* The code is defining a React functional component called `NewsLetterFormSection`. */
export default function NewsLetterFormSection ({ blok }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { ref, inView } = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5,
    triggerOnce: true
  })

  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (inView) {
      anime({
        targets: '.newsletter_form_section--stagger_reveal',
        delay: anime.stagger(200),
        opacity: 1,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  return (
    <Stack
      ref={ref}
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'secondary.main', width: 1 }}
    >
      <Container
        maxWidth='md'
        sx={{
          paddingBlock: { xs: 10, sm: 15 },
          paddingInline: { xs: 4, sm: 10, md: 0 }
        }}
      >
        <Grid container spacing={5}>
          <Stack
            component={Grid}
            xs={12}
            md={6}
            item
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Typography
              align='center'
              variant='button'
              color='text.secondary'
              className='newsletter_form_section--stagger_reveal'
              sx={{ opacity: 0 }}
            >
              {blok.tag}
            </Typography>
            <Typography
              align='center'
              variant='h6'
              component='h2'
              className='newsletter_form_section--stagger_reveal'
              sx={{ opacity: 0 }}
            >
              {blok.title}
            </Typography>
            <Typography
              align='center'
              variant='body2'
              className='newsletter_form_section--stagger_reveal'
              sx={{ maxWidth: 200, opacity: 0 }}
            >
              {blok.subtitle}
            </Typography>
            <NewsLetterForm
              className='newsletter_form_section--stagger_reveal'
              sx={{ opacity: 0 }}
            />
          </Stack>
          <Stack
            component={Grid}
            xs={12}
            md={6}
            item
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Box
              sx={{
                overflow: 'hidden',
                position: 'relative',
                borderRadius: '50%',
                width: 300,
                height: 300
              }}
            >
              <Image
                src={blok.image.filename}
                alt={blok.image.alt}
                fill
                sizes='(max-width: 768px) 250px,  300px'
                className='newsletter_form_section--stagger_reveal'
                style={{ objectFit: 'cover', opacity: 0 }}
              />
            </Box>
            <Typography
              variant='subtitle2'
              className='newsletter_form_section--stagger_reveal'
              sx={{ opacity: 0 }}
            >
              {blok.description}
            </Typography>
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}
