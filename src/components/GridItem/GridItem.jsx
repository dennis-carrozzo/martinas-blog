import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Grid from '@mui/material/Grid'

/* The code is defining a React functional component called `StoryblokGridItem`.It is a Mui Grid item component
customizable through Storyblok UI. */
export default function StoryblokGridItem ({ blok }) {
  return (
    <Grid item {...JSON.parse(blok?.props)} {...storyblokEditable(blok)}>
      {blok?.childComponent?.map(nestedBlok => {
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      })}
    </Grid>
  )
}
