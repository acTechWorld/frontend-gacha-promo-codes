<!-- Contact Form
  - Name
  - Email
  - Message
Contact Email (contact@example.com)
Social Media Links (Icons/Links)
Office Location (Map) -->
<template>
  <div :style="{ minHeight: '100vh', paddingTop: '100px', maxWidth: '1600px', margin: '0 auto' }">
    <ContactSection
      title="Get in touch"
      subtitle="Our friendly team would love to answer your questions"
      img="https://creatoom.com/wp-content/uploads/2023/12/scene-with-box-paper-mockups-v4-top-view-1024x683.jpg"
      bgColor="#fff"
      color="#475467"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import utilsApiService from '@/services/utilsApiService'
import { ContactSection } from '@vue-landing/vue-landing'

//Methods
const handleSubmit = (datas: {
  email: string
  firstname: string
  lastname: string
  companyName: string
  message: string
}) => {
  console.log
  utilsApiService.sendContactEmail({
    email: datas.email,
    firstName: datas.firstName,
    lastName: datas.lastName,
    companyName: datas.companyName,
    message: datas.message
  })
}
</script>

<style scoped></style>
