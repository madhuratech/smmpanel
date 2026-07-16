import Hero from '../components/Hero'
import useScrollToTop from '../hooks/useScrollToTop'

const Facebook = () => {
  useScrollToTop()
  return <Hero platform="facebook" />
}

export default Facebook;
