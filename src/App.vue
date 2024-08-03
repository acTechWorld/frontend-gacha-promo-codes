<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
const handleClickItem = (item: { category?: string; page: string }) => {
  router.push({ name: item.page })
}
</script>

<template>
  <div>
    <HeaderSection
      sticky
      :menu-items="[
        { name: 'home', label: 'Home' },
        { name: 'pricing', label: 'Pricing' },
        {
          category: 'Ressources',
          large: true,
          subMenuItems: [
            { name: 'docInstall', label: 'Installation guide', icon: 'arrow-right' },
            {
              name: 'onlineDocumentation',
              label: 'Online components documentation',
              icon: 'arrow-right'
            },
            { name: 'liveDemo', label: 'Live demo', icon: 'arrow-right' }
          ]
        },
        { name: 'contact', label: 'Contact' }
      ]"
      company-logo="logo_icon.png"
      company-name="VueLanding"
      @click-page="handleClickItem"
      @click-logo="handleClickItem({ page: 'home' })"
    />
    <RouterView />
    <FooterSection
      :inner-width="1500"
      :top-section="{
        text: 'Build Stunning Landing Pages with Ease',
        companyLogo: 'logo_icon.png',
        companyName: 'VueLanding',
        pages: {
          VueLanding: [
            { name: 'home', label: 'Home' },
            { name: 'pricing', label: 'Pricing' },
            { name: 'contact', label: 'Contact' }
          ],
          Ressources: [
            { name: 'components', label: 'Components' },
            { name: 'onlineDocumentation', label: 'Online documentation' },
            { name: 'liveDemo', label: 'Live demo' }
          ]
        }
      }"
      :bottom-section="{
        copyrights: '2077 VueLanding. All rights reserved'
      }"
    />
  </div>
</template>
