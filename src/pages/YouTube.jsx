import Hero from '../components/Hero'
import useScrollToTop from '../hooks/useScrollToTop'

const YouTube = () => {
  useScrollToTop()
  return <Hero platform="youtube" />
}

export default YouTube;
