<!-- Contact Form
  - Name
  - Email
  - Message
Contact Email (contact@example.com)
Social Media Links (Icons/Links)
Office Location (Map) -->
<template>
  <ToastComponent
    :message="messageToast"
    :type="typeToast"
    :duration="durationToast"
    ref="toast"
    :style="{ width: '400px' }"
  />
  <div :style="{ minHeight: '100vh', paddingTop: '100px', maxWidth: '1600px', margin: '0 auto' }">
    <ContactSection
      title="Get in touch"
      subtitle="Our friendly team would love to answer your questions"
      img="https://creatoom.com/wp-content/uploads/2023/12/scene-with-box-paper-mockups-v4-top-view-1024x683.jpg"
      bgColor="#fff"
      color="#475467"
      :loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import utilsApiService from '@/services/utilsApiService'
import { ref } from 'vue'
const toast = ref(null)
const messageToast = ref('')
const typeToast = ref('success')
const loading = ref(false)
const durationToast = ref(0)

//Methods
const handleSubmit = async (datas: {
  email: string
  firstName: string
  lastName: string
  companyName: string
  message: string
}) => {
  loading.value = true
  const res = await utilsApiService.sendContactEmail({
    email: datas.email,
    firstName: datas.firstName,
    lastName: datas.lastName,
    companyName: datas.companyName,
    message: datas.message
  })
  if (res === true) {
    durationToast.value = 10000
    typeToast.value = 'success'
    messageToast.value = 'Your message has been sent, we will respond to you as soon as possible'
    toast.value?.show()
  } else {
    durationToast.value = 0
    typeToast.value = 'error'
    messageToast.value = 'An error occurred while sending your message, please try again'
    toast.value?.show()
  }
  loading.value = false
}
</script>

<style scoped></style>
