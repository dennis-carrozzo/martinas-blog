import { storyblokEditable } from '@storyblok/react'
import Typography from '@mui/material/Typography'

/* The code is defining a React functional component called `StoryblokTypography`.
It is a Mui Typography container component customizable through Storyblok UI. */
export default function StoryblokTypography ({ blok }) {
  return (
    <Typography {...storyblokEditable(blok)} {...JSON.parse(blok.props)}>
      {blok.text}
    </Typography>
  )
}
