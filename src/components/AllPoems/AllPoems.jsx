import { useState, useEffect, useCallback } from 'react'
import { storyblokEditable, getStoryblokApi } from '@storyblok/react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PoemCard from '@/components/PoemCard'

/* The code is defining a React functional component called `AllPoems`. This component is responsible
for rendering a list of poems fetched from the Storyblok API and displaying them in a grid layout.
The component also includes pagination functionality to navigate through the list of poems. */
export default function AllPoems ({ blok }) {
  const [poems, setPoems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const storyblokApi = getStoryblokApi()
  const itemsPerPage = 9

  /* The `getPoems` function is a callback function that is used to fetch poems from the Storyblok API.
  It takes an optional `page` parameter, which defaults to 1. */
  const getPoems = useCallback(
    async (page = 1) => {
      // fetching poems
      const { data, ...rest } = await storyblokApi.get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'poetry/',
        is_startpage: false,
        per_page: itemsPerPage,
        page
      })
      // calculating number of pages needed if totalPages state is equal to 0,
      // meaning is first call
      if (totalPages === 0) {
        const totalPagesNumber = Math.floor(+rest.headers.total / itemsPerPage)
        const totalPagesRemainder = +rest.headers.total % itemsPerPage
        setTotalPages(
          prev => totalPagesNumber + (totalPagesRemainder !== 0 ? 1 : 0)
        )
      }
      // storing poems in state
      setPoems(prev => data.stories.map(article => article))
    },
    [storyblokApi, totalPages]
  )

  /* The `setPrevPageHandler` callback function is a method that is used to handle the event when the
  user clicks on the "Prev" button in the pagination section. */
  const setPrevPageHandler = useCallback(() => {
    setCurrentPage(prev => prev - 1)
    getPoems(currentPage - 1)
  }, [currentPage, getPoems])

  /* The `setNextPageHandler` function is a callback function that is used to handle the event when the
  user clicks on the "Next" button in the pagination section. */
  const setNextPageHandler = useCallback(() => {
    setCurrentPage(prev => prev + 1)
    getPoems(currentPage + 1)
  }, [currentPage, getPoems])

  // fetching all poems on mount
  useEffect(() => {
    getPoems()
  }, [getPoems])

  // render
  return (
    // Background color Container
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
          paddingBlock: 12,
          paddingInline: { xs: 2, sm: 10 },
          width: 1
        }}
      >
        {/* Poems grid */}
        <Grid container spacing={4} sx={{ marginBlock: 2 }}>
          {!!poems[0] &&
            poems.map(poem => {
              return (
                <Grid item xs={12} sm={6} md={4} key={poem.uuid}>
                  <PoemCard poem={poem} variant='variant1' />
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
