import { storyblokEditable } from '@storyblok/react'
import NextMuiLink from '../NextMuiLink'

/**
 * The MenuLink component is a React component that renders a link with customizable styles and a
 * title.
 */
export default function MenuLink ({ blok, sx }) {
  return (
    <NextMuiLink
      to={blok.link.cached_url === 'home' ? '/' : blok.link.cached_url}
      {...storyblokEditable(blok)}
      sx={sx || { color: 'dark.main', textDecoration: 'none' }}
    >
      {blok.title}
    </NextMuiLink>
  )
}
