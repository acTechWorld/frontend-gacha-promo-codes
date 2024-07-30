<!-- Pricing Headline (Choose Your Plan)
Pricing Table
  - Plan 1 (Demo)
    - Price
    - Features List
    - CTA Button (Choose Plan)
  - Plan 2 (Pro)
    - Price
    - Features List
    - CTA Button (Choose Plan)
  - Plan 3 (Enterprise)
    - Price
    - Features List
    - CTA Button (Choose Plan)
Payment Methods Section
  - Credit Cards
  - PayPal
  - Other Methods -->

<template>
  <div>
    <PricingSectionTable
      @clickPricing="handleClickPricing"
      :topSection="{
        title: 'Simple, transparent pricing',
        subtitle: 'Pay once, use forever in unlimited projects. Free updates for life.'
      }"
      :bottomSection="{
        bgColor: '#fff',
        hideBottomPricingCTA: false,
        pricings: [
          {
            id: 'demo',
            type: 'Demo plan',
            description: 'Try the demo version of VueLanding for free',
            amount: 0,
            currency: '$',
            color: '#475467',
            bgColor: '#fff',
            ctaButton: {
              name: 'getStarted',
              label: 'Get started',
              themeColor: 'tertiary'
            }
          },
          {
            id: 'single',
            type: 'Single developer',
            description: 'A single license for solo developers, freelancers',
            amount: 99,
            currency: '$',
            color: '#475467',
            disabled: true,
            disabledText: 'Not available temporarily',
            bgColor: '#fff',
            ctaButton: {
              name: 'getStarted',
              label: 'Get started',
              themeColor: 'tertiary'
            }
          },
          {
            id: 'enterprise',
            type: 'Enterprise plan',
            description: 'Unlimited access package, perfect for scaling your projects',
            amount: 499,
            currency: '$',
            disabled: true,
            disabledText: 'Not available temporarily',
            color: '#475467',
            bgColor: '#fff',
            ctaButton: {
              name: 'getStarted',
              label: 'Get started',
              themeColor: 'tertiary'
            }
          }
        ],
        features: [
          {
            name: 'time',
            label: 'Access Time',
            pricingValues: { demo: '7 days', single: 'Unlimited', enterprise: 'Unlimited' }
          },
          {
            name: 'users',
            label: 'Users',
            pricingValues: { demo: '1', single: '1', enterprise: 'Unlimited' }
          },
          {
            name: 'ctaSection',
            label: 'CTA Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'contactSection',
            label: 'Contact Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'faqSection',
            label: 'FAQ Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'featuresSection',
            label: 'Features Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'footerSection',
            label: 'Footer Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'headerSection',
            label: 'Header Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'heroSection',
            label: 'Hero Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'metricsSection',
            label: 'Metric Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'newsletterSection',
            label: 'Newsletter Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'pricingSectionCards',
            label: 'Pricing Section Cards',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'pricingSectionTable',
            label: 'Pricing Section Table',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'socialProofSection',
            label: 'Social Proof Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          },
          {
            name: 'teamSection',
            label: 'Team Section',
            pricingValues: { demo: true, single: true, enterprise: true }
          }
        ]
      }"
    />
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
//Methods
const handleClickPricing = (pricingId: string | number) => {
  if (pricingId === 'demo') {
    router.push({ name: 'demo' })
  }
}
</script>
