import { storyblokEditable } from '@storyblok/react'
import Variant1 from './Variant1'
import Variant2 from './Variant2'
import Variant3 from './Variant3'
import Variant4 from './Variant4'
import Variant5 from './Variant5'
import Variant6 from './Variant6'

/**
 * This function returns a React component based on the variant specified in the `blok` object.
 * @returns a React component based on the value of the `blok.variant` property. `
 */
export default function ContentSection ({ blok }) {
  switch (blok.variant) {
    case 'variant-6':
      return <Variant6 blok={blok} {...storyblokEditable(blok)} />
    case 'variant-5':
      return <Variant5 blok={blok} {...storyblokEditable(blok)} />
    case 'variant-4':
      return <Variant4 blok={blok} {...storyblokEditable(blok)} />
    case 'variant-3':
      return <Variant3 blok={blok} {...storyblokEditable(blok)} />
    case 'variant-2':
      return <Variant2 blok={blok} {...storyblokEditable(blok)} />
    case 'variant-1':
    default:
      return <Variant1 blok={blok} {...storyblokEditable(blok)} />
  }
}
