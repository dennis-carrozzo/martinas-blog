import Head from 'next/head'
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent
} from '@storyblok/react'

/**
 * This function is a React component that renders the homepage, including metadata
 * for SEO and social media sharing.
 */
export default function Home ({ story }) {
  story = useStoryblokState(story, {
    resolve_relations: [
      'FeaturedArticles.articles',
      'FeaturedArticles.mainArticle'
    ]
  })
  return (
    <div>
      <Head>
        <title>Martina&apos;s blog</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {!!story.content.seo && !!story.content.seo[0] && (
          <>
            <meta
              name='description'
              content={story.content.seo[0].description || "martina's blog"}
            />
            {/* Open graph */}
            <meta property='og:locale' content='en_UK' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={story.content.seo[0].title} />
            <meta
              property='og:description'
              content={story.content.seo[0].description}
            />
            <meta
              property='og:image'
              content={story.content.seo[0].image.filename}
            />
            <meta property='og:image:width' content='300' />
            <meta property='og:image:height' content='300' />
            <meta
              property='og:image:alt'
              content={story.content.seo[0].image.alt}
            />
            <meta
              property='og:image:type'
              content={story.content.seo[0].image.content_type}
            />
            <meta property='og:url' content={story.content.seo[0].site_url} />
            <meta
              property='og:site_name'
              content={story.content.seo[0].site_name}
            />
            {/* twitter */}
            <meta property='twitter:card' content='summary_large_image' />
            <meta
              property='twitter:title'
              content={story.content.seo[0].title}
            />
            <meta
              property='twitter:description'
              content={story.content.seo[0].description}
            />
            <meta
              property='twitter:site'
              content={story.content.seo[0].site_url}
            />
            <meta
              property='twitter:image'
              content={story.content.seo[0].image.filename}
            />
          </>
        )}
      </Head>
      <StoryblokComponent blok={story.content} />
    </div>
  )
}

/**
 * The below function is an async function that fetches data from the Storyblok API and returns it as
 * props for a Next.js page.
 */
export async function getStaticProps ({ params, ...context }) {
  const slug = 'home'

  const sbParams = {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_links: 'url',
    resolve_relations: [
      'FeaturedArticles.articles',
      'FeaturedArticles.mainArticle'
    ]
  }

  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)
  const { data: config } = await storyblokApi.get(
    'cdn/stories/config',
    sbParams
  )

  return {
    props: {
      story: data.story,
      key: data.story.id,
      config: config ? config.story : false,
      preview: context.preview || false
    }
  }
}
