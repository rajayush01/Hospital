import ClinicalExcellenceCenters from '@/components/home/ClinicalExcellenceCenters'
import DoctorsShowcase from '@/components/home/DoctorsShowcase'
import FAQSection from '@/components/home/FAQSection'
import FloatingSidebar from '@/components/home/FloatingSidebar'
import HeroSection from '@/components/home/HeroSection'
import SupportServices from '@/components/home/SupportServices'
import VideoTestimonials from '@/components/home/VideoTestimonials'

const Home = () => {
  return (
    <div>
      <section id="hero-section">
        <HeroSection />
      </section>
      
      <FloatingSidebar heroSectionId="hero-section" />
      
      <ClinicalExcellenceCenters/>
      <DoctorsShowcase/>
      <SupportServices/>
      <VideoTestimonials/>
      <FAQSection/>
    </div>
  )
}

export default Home
