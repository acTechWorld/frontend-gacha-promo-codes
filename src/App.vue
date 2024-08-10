<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import service from './services/utilsApiService'
import { useRouteQuery } from '@vueuse/router'
import AddCodeForm from '@/components/AddCodeForm.vue'
import type { Code } from './type/type'
const application = useRouteQuery('application')

const mappingApplications = {
  summonerWar: {
    gameTitle: 'Summoner War',
    description: 'Partagez vos codes summoners wars avec la communauté',
    imgUrl: './summonerWarBgImage.jpg'
  }
}

const codes: Ref<Code[]> = ref([])
const displayAddCodeForm = ref(false)

onMounted(() => getCodes())

//COMPUTED
const appInfos = computed(
  () => application.value && mappingApplications[application.value?.toString()]
)

const appStyle = computed(() => {
  return {
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${appInfos.value.imgUrl}) no-repeat`,
    backgroundSize: 'cover'
  }
})

//METHODS
const handleClickAddCode = () => {
  displayAddCodeForm.value = true
}

const getCodes = async () => {
  if (application.value) {
    const data = await service.getAllPromoCodesFromApplication(application.value?.toString() ?? '')
    codes.value = data ?? []
  }
}

//WATCH

watch(
  () => application.value,
  async () => {
    await getCodes()
  }
)
</script>

<template>
  <div v-if="appInfos" :style="appStyle" class="h-screen p-5 w-full pt-[100px] overflow-scroll">
    <AddCodeForm
      v-if="displayAddCodeForm"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      @close="displayAddCodeForm = false"
    />
    <div class="mx-auto max-w-[1200px] w-full flex flex-col gap-20 text-white">
      <div class="appInfos text-center flex flex-col gap-2">
        <div class="font-semibold text-4xl">{{ appInfos.gameTitle }}</div>
        <div class="font-medium text-lg">{{ appInfos.description }}</div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <button
          @click="handleClickAddCode"
          class="text-sm flex ml-auto rounded bg-gray-50 px-2 py-1 text-[#2e2e5f] cursor-pointer hover:bg-gray-200"
        >
          Ajouter un nouveau Code
        </button>
        <div v-if="codes && codes.length > 0">
          <table class="w-full bg-[#2e2e5fbf] [&_th]:border [&_td]:border">
            <thead>
              <tr class="[&>th]:px-3 [&>th]:py-2 text-left">
                <th>Code</th>
                <th>Awards</th>
                <th class="text-center">Vote</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(code, idxCode) in codes"
                :key="`code_${idxCode}`"
                class="[&>td]:px-3 [&>td]:py-2 [&>td]:h-full text-left"
              >
                <td class="w-[200px]">{{ code.code }}</td>
                <td>
                  <span v-if="code.awardDescription">
                    {{ code.awardDescription }}
                  </span>
                  <ul v-if="code.awardDetails?.length > 0">
                    <li
                      v-for="(awardDetail, idxAward) in code.awardDetails"
                      :key="`code_${idxCode}_awardDetail_${idxAward}`"
                    >
                      <span>{{ awardDetail.label }}</span>
                      <span>x{{ awardDetail.count }}</span>
                    </li>
                  </ul>
                </td>
                <td class="w-[200px]">
                  <div class="flex items-center gap-5 justify-center">
                    <div class="flex flex-col gap-2">
                      <FontAwesomeIcon
                        class="cursor-pointer"
                        size="xl"
                        :icon="['far', 'thumbs-up']"
                      />
                      <FontAwesomeIcon
                        class="cursor-pointer"
                        size="xl"
                        :icon="['far', 'thumbs-down']"
                      />
                    </div>
                    <div
                      :class="{
                        'text-green-500': code.upVote - code.downVote > 0,
                        'text-red-500': code.upVote - code.downVote < 0
                      }"
                    >
                      {{ code.upVote - code.downVote }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else>INVALID GAME</div>
</template>
<style lang="css">
body {
  margin: 0;
}
</style>
