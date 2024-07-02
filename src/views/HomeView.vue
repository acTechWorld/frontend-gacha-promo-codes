<script setup lang="ts">
import { HeroSection, FeaturesSection } from '@oncekiller/vue-landing'
</script>

<template>
  <main>
    <div>
      <HeroSection
        title="Build Stunning Landing Pages with Ease"
        subtitle="Discover our powerful and customizable Vue.js component library"
        :cta-buttons="[
          {
            name: 'browse',
            label: 'Discover Components',
            themeColor: 'secondary'
          }
        ]"
      />
    </div>
    <!-- <FeaturesSection :features="[]" /> -->
  </main>
</template>

<!-- Header
  - Logo
  - Navigation Menu (Home, Components, Pricing, About, Blog, Contact)
Hero Section
  - Headline
  - Subheadline
  - Hero Image/Video
  - CTA Button (Browse Components)
Features Section
  - Feature 1 (e.g., Customizable)
  - Feature 2 (e.g., Responsive)
  - Feature 3 (e.g., SEO-Friendly)
Testimonials Section
  - Customer 1 Testimonial
  - Customer 2 Testimonial
CTA Section
  - CTA Button (Get Started)
Footer
  - Links to important pages, social media, contact info -->
