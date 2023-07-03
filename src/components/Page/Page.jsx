import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Box from '@mui/material/Box'

/* The code is defining a React functional component called "Page" that takes a prop called "blok".
Inside the component, it returns a Box component from the Material-UI library. The Box component is
used as the main container for the page. */
export default function Page ({ blok }) {
  return (
    <Box
      component='main'
      sx={{
        overflow: 'hidden',
        scrollBehavior: 'smooth',
        width: 1
      }}
      {...storyblokEditable(blok)}
    >
      {blok.body?.map(nestedBlok => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </Box>
  )
}
