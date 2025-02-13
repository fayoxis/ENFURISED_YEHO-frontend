<template>

  <div class="min-h-screen space-y-10 instet-0 overflow-x-hidden bg-white ">
    <ProjectSpaceBanner/>
    <!-- <HeaderSection />  -->
    <hero-section />
    <category-section />
    <StepSection />
    <PropertySection/>
    <EventVenueSection/>
    <PublicitySection/>
  </div>
</template>

<script>
import HeroSection from '~/components/home/HeroSection.vue'
import CategorySection from '~/components/home/CategorySection.vue'
import StepSection from '~/components/home/StepSection.vue'
import HeaderSection from  '~/components/home/HeaderSection'
import PropertySection from '~/components/home/PropertySection.vue'
import PublicitySection from '~/components/home/PublicitySection.vue'
import ProjectSpaceBanner from '~/components/home/ProjectSpaceBanner'
import EventVenueSection from '~/components/home/EventVenueSection'

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    CategorySection,
    StepSection,
    HeaderSection,
    PropertySection,
    PublicitySection,
    ProjectSpaceBanner,
    EventVenueSection
  }
}
</script>
<style scoped>
</style>