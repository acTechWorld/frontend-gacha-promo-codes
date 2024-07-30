<template>
  <div :style="{ minHeight: '100vh', paddingTop: '100px', maxWidth: '1600px', margin: '0 auto' }">
    <ContactSection
      title="Try it!"
      subtitle="Request a demo access key, to try the library for a week"
      img="https://creatoom.com/wp-content/uploads/2023/12/scene-with-box-paper-mockups-v4-top-view-1024x683.jpg"
      bgColor="#fff"
      color="#475467"
      :submitButton="{
        name: 'submit',
        label: 'Get an access key'
      }"
      :options="{
        email: { displayed: true, required: true, title: 'Email', placeholder: 'Email' },
        firstName: {
          displayed: true,
          required: true,
          title: 'First name',
          placeholder: 'First name'
        },
        lastName: {
          displayed: true,
          required: true,
          title: 'Last name',
          placeholder: 'Last name'
        }
      }"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import utilsApiService from '@/services/utilsApiService'
const handleSubmit = async (datas: { email: string; firstName: string }) => {
  await utilsApiService.sendDemoKeyEmail(datas)
}
</script>
