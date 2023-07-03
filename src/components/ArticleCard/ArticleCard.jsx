import Variant1 from './Variant1'
import Variant2 from './Variant2'

/**
 * The function exports a React component called ArticleCard that takes in an article object and a
 * variant string as props, and renders different variants of the article card based on the variant
 * prop.
 * @returns a React component based on the value of the `variant` prop. If the `variant` prop is set to
 * 'variant2', it will return the `Variant2` component with the `article` prop passed in. If the
 * `variant` prop is set to 'variant1' or any other value, it will return the `Variant1` component with
 * the `article
 */
export default function ArticleCard ({ article, variant }) {
  if (!Object.hasOwn(article, 'content')) {
    return null
  }
  switch (variant) {
    case 'variant2':
      return <Variant2 article={article} />
    case 'variant1':
    default:
      return <Variant1 article={article} />
  }
}
