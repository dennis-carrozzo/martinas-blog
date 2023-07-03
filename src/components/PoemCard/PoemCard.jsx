import Variant1 from './Variant1'

/**
 * The function exports a React component called PoemCard that takes in a poem object and a variant
 * string as props, and renders a specific variant of the poem card based on the variant prop.
 */
export default function PoemCard ({ poem, variant }) {
  if (!Object.hasOwn(poem, 'content')) {
    return null
  }
  switch (variant) {
    case 'variant1':
    default:
      return <Variant1 poem={poem} />
  }
}
