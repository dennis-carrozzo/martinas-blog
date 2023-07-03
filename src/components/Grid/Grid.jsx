import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Grid from '@mui/material/Grid'

/* The code is defining a React functional component called `StoryblokGrid`.It is a Mui Grid container component
customizable through Storyblok UI. */
export default function StoryblokGrid ({ blok }) {
  return (
    <Grid container {...storyblokEditable(blok)} {...JSON.parse(blok.props)}>
      {blok?.items?.map(nestedBlok => {
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      })}
    </Grid>
  )
}
