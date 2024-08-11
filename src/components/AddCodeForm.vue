<template>
  <div>
    <div class="relative bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
      <FontAwesomeIcon
        size="lg"
        :icon="['fas', 'xmark']"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        @click="closeForm"
      />

      <h2 class="text-2xl font-semibold mb-4 text-center">{{ t('addNewCodeTitle') }}</h2>
      <form @submit.prevent="submitForm" class="space-y-4 max-h-[65vh] overflow-y-auto">
        <div>
          <label for="promoCode" class="block text-sm font-medium text-gray-700">
            {{ t('promoCodeField') }}
          </label>
          <input
            v-model="promoCode.code"
            id="promoCode"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('awardDetailsField') }}
          </label>
          <div class="grid grid-cols-3">
            <div
              v-for="(awardDetail, index) in awardDetailsInDb"
              :key="index"
              class="flex items-center space-x-2 mt-2"
            >
              <img class="w-10" :src="awardDetail.image" />
              <input
                v-model.number="awardDetail.count"
                type="number"
                placeholder="Count"
                min="0"
                class="block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div v-if="awardDetailsNotInDb.length > 0" class="mt-2">
            {{ t('awardNotInDbDetailLabel') }}
          </div>
          <div
            v-for="(detail, index) in awardDetailsNotInDb"
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
            {{ t('awardNotInDbDetailAddButton') }}
          </button>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">
            {{ t('statusField') }}
          </label>
          <select
            v-model="promoCode.status"
            id="status"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="active">{{ t('activeOption') }}</option>
            <option value="inactive">{{ t('inactiveOption') }}</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          {{ t('addPromoCodeButton') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import service from '@/services/service'
import { useI18n } from 'vue-i18n'
import type { AwardItem } from '@/type/type'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    application?: string
    awardItems?: AwardItem[]
  }>(),
  {
    application: 'summonerWar',
    awardItems: () => []
  }
)

const promoCode = ref({
  code: '',
  status: 'active'
})

const emits = defineEmits(['close', 'submit'])

const awardDetails: Ref<any[]> = ref(
  props.awardItems.map((awardItem) => ({ ...awardItem, count: 0 }))
)

const addDetail = () => {
  awardDetails.value.push({ label: '', count: 0 })
}

const removeDetail = (index: number) => {
  awardDetails.value.splice(index, 1)
}

//COMPUTED
const awardDetailsInDb = computed(() =>
  awardDetails.value.filter((awardDetail) => awardDetail.id !== undefined)
)

const awardDetailsNotInDb = computed(() =>
  awardDetails.value.filter((awardDetail) => awardDetail.id === undefined)
)

//METHODS
const submitForm = async () => {
  try {
    const res = await service.createPromoCode({
      ...promoCode.value,
      upVote: 0,
      downVote: 0,
      awardDetails: awardDetails.value
        .filter((item) => item.label && item.count > 0)
        .map((item) => ({ count: item.count, label: item.label, awardItemId: item.id })),
      application: props.application
    })

    // Reset form
    promoCode.value.code = ''
    awardDetails.value = []
    promoCode.value.status = 'active'

    closeForm()
    emits('submit')
  } catch (error) {
    console.error('Error adding promo code:', error)
  }
}

const closeForm = () => emits('close')
</script>
