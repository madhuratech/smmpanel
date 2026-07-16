import Hero from '../components/Hero'
import useScrollToTop from '../hooks/useScrollToTop'

const Instagram = () => {
  useScrollToTop()
  return <Hero platform="instagram" />
}

export default Instagram;
