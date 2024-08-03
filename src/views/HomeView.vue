<script setup lang="ts">
import router from '@/router'

//Methods
const handleClickPricing = (pricingId: string | number) => {
  if (pricingId === 'demo') {
    router.push({ name: 'demo' })
  }
}
</script>

<template>
  <div>
    <HeroSection
      video="https://vuelanding.com/hero_video.mp4"
      title="Build Stunning Landing Pages with Ease"
      subtitle="Discover our powerful and customizable Vue.js component library"
      :cta-buttons="[
        {
          name: 'browse',
          label: 'Discover VueLanding',
          themeColor: 'secondary'
        }
      ]"
    />
    <FeaturesSection
      :style="{ paddingTop: '200px' }"
      title="What VueLanding can do for you ?"
      subtitle="VueLanding offers a comprehensive suite of modern, responsive, and customizable Vue.js components, enabling developers to build stunning landing pages with ease"
      :content-width="1300"
      bgColor="#fff"
      color="#000"
      :features="[
        {
          label: 'Extensive Component Library',
          description: 'A vast collection of pre-built components tailored for landing pages',
          video: 'https://vuelanding.com/feature_section1_video.mp4',
          featurePoints: [
            'Top used components for every part of your landing pages',
            'Ready to be integrated without efforts',
            'Open for customization if needed',
            'Using modern stack with Vue.js Typscript and Tailwind'
          ],
          bgColor: '#f9fafb',
          color: '#475467'
        },
        {
          label: 'High Customizability',
          description: 'Easily customize each component to match your brand’s style and design',
          video: 'https://vuelanding.com/feature_section3_video.mov',

          featurePoints: [
            'Flexible props options',
            'Alternative versions of each components',
            'Compatible with tailwind theme'
          ],
          bgColor: '#fff',
          color: '#475467'
        },
        {
          label: 'Fast and Easy Integration',
          description: 'Simple and straightforward integration into any Vue.js project',
          video: 'https://vuelanding.com/feature_section3_video.mov',
          featurePoints: [
            'Detailed documentation',
            'Integrated typescript component description',
            'Online storybook demo with examples',
            'High responsiveness for every screen size'
          ],
          bgColor: '#f9fafb',
          color: '#475467'
        }
      ]"
    />
    <SocialProofSection
      :style="{ padding: '100px 0', width: '80%', margin: '0 auto' }"
      bgColor="#fff"
      color="#475467"
      :datas="[
        {
          imgProfile:
            'https://img.freepik.com/photos-gratuite/portrait-homme-riant_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1713916800&semt=ais',

          name: 'Michael Brown',
          title: 'Web Developer',
          testimony:
            'I\'ve tried several component libraries, but My Vue Landing Page Library stands out for its extensive component collection and seamless integration. The detailed documentation and examples made the setup process incredibly smooth'
        },
        {
          imgProfile:
            'https://img.freepik.com/photos-gratuite/portrait-homme-riant_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1713916800&semt=ais',
          name: 'Emily Johnson',
          title: 'Product Manager',
          testimony: 'Using VueLanding has significantly sped up our development process'
        },
        {
          imgProfile:
            'https://img.freepik.com/photos-gratuite/portrait-homme-riant_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1713916800&semt=ais',
          name: 'Arthur Desmazier',
          title: 'UI/UX Designer',
          testimony:
            'The flexibility and ease of use of My Vue Landing Page Library are unmatched. It has everything I need to create beautiful, responsive designs'
        }
      ]"
    />
    <CTASection
      :style="{ padding: '100px 0' }"
      title="Ready to Build Stunning Landing Pages?"
      subtitle="Get started with VueLanding today or ask for a demo period if you want to test it"
      :cta-buttons="[
        {
          name: 'start',
          label: 'Get Started',
          themeColor: 'tertiary'
        },
        {
          name: 'demo',
          label: 'Request a Demo',
          themeColor: 'secondary'
        }
      ]"
    />
    <PricingSectionCards
      @click-pricing-cta-button="({ pricingId }) => handleClickPricing(pricingId)"
      @click-pricing="handleClickPricing"
      :top-section="{
        bgColor: '#f9fafb',
        color: '#000',
        title: 'Simple, transparent pricing',
        subtitle: 'Pay once, use forever in unlimited projects. Free updates for life.'
      }"
      :bottom-section="{
        bgColor: '#fff',
        pricings: [
          {
            id: 'demo',
            type: 'Demo plan',
            description: 'Try the demo version of VueLanding for free',
            amount: 0,
            currency: '$',
            color: '#475467',
            bgColor: '#fff',
            ctaButtons: [
              {
                name: 'getStarted',
                label: 'Get started',
                themeColor: 'tertiary'
              }
            ],
            features: ['Access to all basic components for 7 days', 'Online documentation']
          },
          {
            id: 'single',
            type: 'Single developer',
            description: 'A single license for solo developers, freelancers',
            amount: 99,
            currency: '$',
            color: '#475467',
            bgColor: '#fff',
            disabled: true,
            disabledText: 'Not available temporarily',
            ctaButtons: [
              {
                name: 'getStarted',
                label: 'Get started',
                themeColor: 'tertiary'
              }
            ],
            features: [
              'Access to all components',
              'Single user license',
              'Online documentation',
              'Free lifetime updates'
            ]
          },
          {
            id: 'enterprise',
            type: 'Enterprise plan',
            description: 'Unlimited access package, perfect for scaling your projects',
            amount: 499,
            currency: '$',
            color: '#475467',
            bgColor: '#fff',
            disabled: true,
            disabledText: 'Not available temporarily',
            ctaButtons: [
              {
                name: 'getStarted',
                label: 'Get started',
                themeColor: 'tertiary'
              }
            ],
            features: [
              'Access to all components',
              'Unlimited user licenses',
              'Online documentation',
              'Free lifetime updates',
              'Priority chat and email support'
            ]
          }
        ]
      }"
    />
  </div>
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
