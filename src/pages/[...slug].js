import Head from 'next/head'
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent
} from '@storyblok/react'

/**
 * The function exports a React component that renders a page with a title and a StoryblokComponent.
 * it also includes metadata for SEO and social media sharing.
 */
export default function Page ({ story }) {
  story = useStoryblokState(story, {
    resolve_relations: [
      'Article.featuredArticles',
      'Poem.featuredPoems',
      'FeaturedArticles.articles',
      'FeaturedArticles.mainArticle'
    ]
  })
  return (
    <div>
      <Head>
        <title>{story ? story.name : "Martina's"}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content={story.content.seo[0].description || "martina's blog"}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {!!story.content.seo && !!story.content.seo[0] && (
          <>
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
 * This function is used to fetch data from the Storyblok API and return it as props for a Next.js
 * page.
 */
export async function getStaticProps ({ params, ...context }) {
  const slug = params.slug ? params.slug.join('/') : 'home'
  const sbParams = {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_links: 'url',
    resolve_relations: [
      'Article.featuredArticles',
      'Poem.featuredPoems',
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
  data.story.content.tag_list = data.story.tag_list
  data.story.content.published_at = data.story.published_at
  data.story.content.created_at = data.story.created_at
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false
    }
  }
}

/**
 * The function `getStaticPaths` retrieves the static paths for a Next.js application by making an API
 * request to Storyblok and filtering out certain paths.
 * @returns an object with two properties: "paths" and "fallback". The "paths" property is an array of
 * objects, where each object represents a path with a "slug" parameter. The "fallback" property is set
 * to false, indicating that any paths not included in the "paths" array will result in a 404 page.
 */
export async function getStaticPaths () {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/links/', {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
  })
  const paths = []
  Object.keys(data.links).forEach(linkKey => {
    if (
      data.links[linkKey].is_folder ||
      data.links[linkKey].slug === 'home' ||
      data.links[linkKey].slug === 'config'
    ) {
      return
    }
    const slug = data.links[linkKey].slug
    const splittedSlug = slug.split('/')

    paths.push({ params: { slug: splittedSlug } })
  })

  return {
    paths,
    fallback: false
  }
}
