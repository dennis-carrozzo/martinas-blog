import { useState, useEffect, useCallback, useMemo } from 'react'
import { storyblokEditable, getStoryblokApi } from '@storyblok/react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArticleCard from '@/components/ArticleCard'
import CategoriesFilters from './CategoriesFilters'

// number of items to be displayed per page in articles grid
const itemsPerPage = 9

/* The code is defining a React functional component called `AllArticles`. This component is
responsible for displaying a grid of articles fetched from the Storyblok API with filter by
category functionality. */
export default function AllArticles ({ blok }) {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const storyblokApi = useMemo(() => getStoryblokApi(), [])

  /* The `getArticles` function is a callback function that is used to fetch articles from the
  Storyblok API. It takes two parameters: `page` and `categoriesFilter`. */
  const getArticles = useCallback(
    async (page = 1, categoriesFilter) => {
      // fetching articles
      const { data, ...rest } = await storyblokApi.get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'blog/',
        is_startpage: false,
        per_page: itemsPerPage,
        page,
        with_tag: categoriesFilter ? categoriesFilter.join(',') : null
      })
      // calculating number of pages needed if current totalPages state equals 0,
      // meaning it has been calculated already on previous renders
      if (totalPages === 0) {
        const totalPagesNumber = Math.floor(+rest.headers.total / itemsPerPage)
        const totalPagesRemainder = +rest.headers.total % itemsPerPage
        setTotalPages(
          prev => totalPagesNumber + (totalPagesRemainder !== 0 ? 1 : 0)
        )
      }
      // storing articles in state
      setArticles(prev => data.stories.map(article => article))
    },
    [storyblokApi, totalPages]
  )

  /* The `setVisibilityFilter` function is a callback function that is used to toggle the selection of
  categories in the filter for the articles grid. */
  const setVisibilityFilter = useCallback(
    category => {
      setSelectedCategories(prev => {
        // reset case
        if (!category || categories.length === selectedCategories.size) {
          return new Set()
        }
        // toggle selectedCategory functionality
        const newState = new Set(prev)
        if (newState.has(category)) {
          newState.delete(category)
          return newState
        } else {
          newState.add(category)
          return newState
        }
      })
    },
    [categories.length, selectedCategories.size]
  )

  /* The `setPrevPageHandler` function is a callback function that is used to handle the event when the
  user clicks on the "Prev" button in the pagination section. It will set the currentPage state
  and fetch the articles content page from storyblok api */
  const setPrevPageHandler = useCallback(() => {
    setCurrentPage(prev => prev - 1)
    getArticles(currentPage - 1)
  }, [currentPage, getArticles])

  /* The `setNextPageHandler` function is a callback function that is used to handle the event when the
  user clicks on the "Next" button in the pagination section. It will set the currentPage state
  and fetch the articles content page from storyblok api */
  const setNextPageHandler = useCallback(() => {
    setCurrentPage(prev => prev + 1)
    getArticles(currentPage + 1)
  }, [currentPage, getArticles])

  // fetching all articles and categories on mount
  useEffect(() => {
    // fetching blog categories
    const getBlogCategories = async () => {
      const { data } = await storyblokApi.get('cdn/tags/', {
        starts_with: 'blog/',
        is_startpage: false,
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      const categoriesArray = data.tags.map(tag => tag.name)
      setCategories(categoriesArray)
    }
    getArticles()
    getBlogCategories()
  }, [storyblokApi, getArticles])

  // fetching articles when category selected with according filter
  useEffect(() => {
    getArticles(
      1,
      selectedCategories.size === categories.length
        ? []
        : [...selectedCategories]
    )
  }, [selectedCategories, categories.length, storyblokApi, getArticles])

  // render
  return (
    // Background color container
    <Stack
      justifyContent='center'
      alignItems='center'
      {...storyblokEditable(blok)}
    >
      {/* Width container */}
      <Container
        disableGutters
        maxWidth='lg'
        sx={{
          position: 'relative',
          width: 1,
          paddingBlock: 12,
          paddingInline: { xs: 2, sm: 10 }
        }}
      >
        {/* Categories filters */}
        <CategoriesFilters
          categories={categories}
          selectedCategories={selectedCategories}
          handler={setVisibilityFilter}
        />
        {/* Articles grid */}
        <Grid container spacing={4} sx={{ marginBlock: 2 }}>
          {!!articles[0] &&
            articles.map(article => {
              return (
                <Grid item xs={12} sm={6} md={4} key={article.uuid}>
                  <ArticleCard article={article} variant='variant2' />
                </Grid>
              )
            })}
        </Grid>
        {/* Pagination */}
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <Button disabled={currentPage === 1} onClick={setPrevPageHandler}>
            Prev
          </Button>
          <Typography variant='button'>{currentPage}</Typography>
          <Button
            disabled={currentPage === totalPages}
            onClick={setNextPageHandler}
          >
            Next
          </Button>
        </Stack>
      </Container>
    </Stack>
  )
}
