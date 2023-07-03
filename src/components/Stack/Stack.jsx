import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Stack from '@mui/material/Stack'

/* The code is defining a React functional component called `StoryblokStack`. It is a Mui Stack container
component customizable through Storyblok UI. */
export default function StoryblokStack ({ blok }) {
  return (
    <Stack {...storyblokEditable(blok)} {...JSON.parse(blok.props)}>
      {blok?.items?.map(nestedBlok => {
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      })}
    </Stack>
  )
}
