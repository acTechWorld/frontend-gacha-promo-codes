<script setup lang="ts">
import {
  HeroSection,
  FeaturesSection,
  SocialProofSection,
  CTASection,
  FooterSection
} from '@oncekiller/vue-landing'
</script>

<template>
  <main>
    <div>
      <HeroSection
        video="https://assets-global.website-files.com/636496d3f0ebfdaba9784655/65288f5440e92ae64d88aa65_Untitled UI promo placeholder v2 (compressed)-transcode.mp4"
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
    </div>
    <FeaturesSection
      title="What VueLanding can do for you ?"
      subtitle="VueLanding offers a comprehensive suite of modern, responsive, and customizable Vue.js components, enabling developers to build stunning landing pages with ease"
      :features="[
        {
          label: 'Extensive Component Library',
          description: 'A vast collection of pre-built components tailored for landing pages',
          video:
            'https://assets-global.website-files.com/636496d3f0ebfdaba9784655/65288f5440e92ae64d88aa65_Untitled UI promo placeholder v2 (compressed)-transcode.mp4',
          featurePoints: [
            'Top used components for every part of your landing pages',
            'Ready to be integrated without efforts',
            'Open for customization if needed',
            'Using modern stack with Vue.js Typscript and Tailwind'
          ]
        },
        {
          label: 'High Customizability',
          description: 'Easily customize each component to match your brand’s style and design',
          video:
            'https://assets-global.website-files.com/636496d3f0ebfdaba9784655/65288f5440e92ae64d88aa65_Untitled UI promo placeholder v2 (compressed)-transcode.mp4',

          featurePoints: [
            'Flexible props options',
            'Alternative versions of each components',
            'Compatible with tailwind theme'
          ]
        },
        {
          label: 'Fast and Easy Integration',
          description: 'Simple and straightforward integration into any Vue.js project',
          video:
            'https://assets-global.website-files.com/636496d3f0ebfdaba9784655/65288f5440e92ae64d88aa65_Untitled UI promo placeholder v2 (compressed)-transcode.mp4',
          featurePoints: [
            'Detailed documentation',
            'Integrated typescript component description',
            'Online storybook demo with examples',
            'High responsiveness for every screen size'
          ]
        }
      ]"
    />
    <SocialProofSection
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
      title="Ready to Build Stunning Landing Pages?"
      subtitle="Get started with My Vue Landing Page Library today and elevate your web development with modern, responsive, and customizable components."
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
