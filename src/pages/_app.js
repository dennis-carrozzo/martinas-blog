import { storyblokInit, apiPlugin } from '@storyblok/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AllArticles from '@/components/AllArticles'
import AllPoems from '@/components/AllPoems'
import Article from '@/components/Article'
import Config from '@/components/Config'
import ContentSection from '@/components/ContentSection'
import ContentSectionWithCardsGrid from '@/components/ContentSectionWithCardsGrid'
import FeaturedArticles from '@/components/FeaturedArticles'
import Grid from '@/components/Grid'
import GridItem from '@/components/GridItem'
import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import MenuLink from '@/components/MenuLink'
import NewsLetterFormSection from '@/components/NewsLetterFormSection'
import Page from '@/components/Page'
import Poem from '@/components/Poem'
import Stack from '@/components/Stack'
import Typography from '@/components/Typography'
import theme from '@/theme'

const components = {
  AllArticles,
  AllPoems,
  Article,
  Config,
  ContentSection,
  ContentSectionWithCardsGrid,
  FeaturedArticles,
  Grid,
  GridItem,
  Hero,
  MenuLink,
  NewsLetterFormSection,
  Page,
  Poem,
  Stack,
  Typography
}

// initialize the storyblok SDK
storyblokInit({
  accessToken: process.env.storyblokPreviewToken,
  use: [apiPlugin],
  components
})

/**
 * The function `MyApp` is a React component that wraps the provided `Component` with a theme provider,
 * CSS baseline, and a layout component.
 */
function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout story={pageProps.config}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
