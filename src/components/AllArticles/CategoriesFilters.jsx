import { memo } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/* The code is defining a React functional component called `CategoriesFilters`. It takes three props
as input: `categories`, `selectedCategories`, and `handler`. Categories is used to render a list of
categories buttons. selectedCategories is used to update currently active category button style.
handler is a method to add/remove a category to selectedCategories. */
const CategoriesFilters = memo(function CategoriesFilters ({
  categories,
  selectedCategories,
  handler
}) {
  return (
    <Stack
      direction={{ sm: 'row' }}
      justifyContent='flex-start'
      spacing={2}
      alignItems='center'
      sx={{ borderBottom: '1px solid grey' }}
    >
      {/* All button */}
      <Typography
        role='button'
        aria-label='view all blog posts'
        variant='subtitle2'
        component='p'
        color={
          categories.length === selectedCategories.size ||
          selectedCategories.size === 0
            ? 'black'
            : 'text.secondary'
        }
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          handler(false)
        }}
      >
        All
      </Typography>
      {/* Categories buttons list */}
      {!!categories[0] &&
        categories.map(category => (
          <Typography
            role='button'
            aria-label={`view blog posts belonging to category ${category}`}
            variant='subtitle2'
            component='p'
            color={
              !selectedCategories.has(category) ||
              categories.length === selectedCategories.size
                ? 'text.secondary'
                : 'black'
            }
            sx={{
              cursor: 'pointer'
            }}
            key={category}
            onClick={() => {
              handler(category)
            }}
          >
            {category}
          </Typography>
        ))}
    </Stack>
  )
})

export default CategoriesFilters
