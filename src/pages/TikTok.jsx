import Hero from '../components/Hero'
import useScrollToTop from '../hooks/useScrollToTop'

const TikTok = () => {
  useScrollToTop()
  return <Hero platform="tiktok" />
}

export default TikTok;
