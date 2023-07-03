import Footer from '@/components/Footer'
import Config from '@/components/Config'

/* The code is defining a React functional component called "Layout". It renders Header and Footer
components around the Page content */
export default function Layout ({ children, story }) {
  return (
    <div>
      <Config blok={story?.content} />
      {children}
      <Footer />
    </div>
  )
}
