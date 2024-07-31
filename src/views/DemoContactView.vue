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
      title="Try it!"
      subtitle="Request a demo access key, to try the library for a week"
      img="https://creatoom.com/wp-content/uploads/2023/12/scene-with-box-paper-mockups-v4-top-view-1024x683.jpg"
      bgColor="#fff"
      color="#475467"
      :loading="loading"
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
import { ref } from 'vue'
const toast = ref(null)
const messageToast = ref('')
const typeToast = ref('success')
const loading = ref(false)
const durationToast = ref(0)

//METHODS
const handleSubmit = async (datas: { email: string; firstName: string }) => {
  loading.value = true
  const res = await utilsApiService.sendDemoKeyEmail(datas)
  if (res === true) {
    durationToast.value = 10000
    typeToast.value = 'success'
    messageToast.value = 'An email has been sent to you containing your licence key'
    toast.value?.show()
  } else {
    durationToast.value = 0
    typeToast.value = 'error'
    messageToast.value = res
    toast.value?.show()
  }
  loading.value = false
}
</script>
