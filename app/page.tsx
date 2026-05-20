import Hero from '@/components/home/Hero'
import FeatureStrip from '@/components/home/FeatureStrip'
import ProductShowcase from '@/components/home/ProductShowcase'
import Testimonials from '@/components/home/Testimonials'
import FAQ from '@/components/home/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <ProductShowcase />
      <Testimonials />
      <FAQ />
    </>
  )
}
