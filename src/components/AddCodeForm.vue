<template>
  <div>
    <div class="relative bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
      <FontAwesomeIcon
        size="lg"
        :icon="['fas', 'xmark']"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        @click="closeForm"
      />

      <h2 class="text-2xl font-semibold mb-4 text-center">Add New Promo Code</h2>
      <form @submit.prevent="submitForm" class="space-y-4 max-h-[65vh] overflow-y-auto">
        <div>
          <label for="promoCode" class="block text-sm font-medium text-gray-700">Promo Code</label>
          <input
            v-model="promoCode.code"
            id="promoCode"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label for="awardDescription" class="block text-sm font-medium text-gray-700"
            >Award Description</label
          >
          <input
            v-model="promoCode.awardDescription"
            id="awardDescription"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Award Details</label>
          <div
            v-for="(detail, index) in awardDetails"
            :key="index"
            class="flex items-center space-x-2 mt-2"
          >
            <input
              v-model="detail.label"
              placeholder="Label"
              class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <input
              v-model.number="detail.count"
              type="number"
              placeholder="Count"
              class="block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <FontAwesomeIcon
              class="text-red-500 cursor-pointer hover:text-red-700"
              :icon="['far', 'circle-xmark']"
              @click="removeDetail(index)"
            />
          </div>
          <button
            type="button"
            @click="addDetail"
            class="mt-3 w-fit inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Detail
          </button>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="promoCode.status"
            id="status"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Add Promo Code
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import service from '@/services/utilsApiService'

const props = withDefaults(
  defineProps<{
    application: string
  }>(),
  { application: 'summonerWar' }
)

const promoCode = ref({
  code: '',
  status: 'active',
  awardDescription: ''
})

const emits = defineEmits(['close'])

const awardDetails = ref([{ label: '', count: 0 }])

const addDetail = () => {
  awardDetails.value.push({ label: '', count: 0 })
}

const removeDetail = (index: number) => {
  awardDetails.value.splice(index, 1)
}

const submitForm = async () => {
  try {
    const res = await service.createPromoCode({
      ...promoCode.value,
      upVote: 0,
      downVote: 0,
      awardDetails: awardDetails.value.filter((item) => item.label),
      application: props.application
    })

    // Reset form
    promoCode.value.code = ''
    promoCode.value.awardDescription = ''
    awardDetails.value = [{ label: '', count: 0 }]
    promoCode.value.status = 'active'

    closeForm()
  } catch (error) {
    console.error('Error adding promo code:', error)
  }
}

const closeForm = () => emits('close')
</script>
