import Hero from '../components/Hero'
import PricingSection from '../components/PricingSection'
import HowToOrder from '../components/HowToOrder'
import WhoBenefits from '../components/WhoBenefits'
import WhyChoose from '../components/WhyChoose'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] min-h-screen">
      <Hero />
      <PricingSection />
      <HowToOrder />
      <WhoBenefits />
      <WhyChoose />
      <CTASection />
      <FAQ />
      <Testimonials />
    </div>
  )
}
