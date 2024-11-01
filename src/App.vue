<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import service from './services/service'
import { useStorage } from '@vueuse/core'
import AddCodeForm from '@/components/AddCodeForm.vue'
import type { AwardItem, Code } from './type/type'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'

type Storage = { promoCodeId: number; variation: string }
let timeoutCopy: boolean | number = false
const VOTED_CODES_KEY = 'votedPromoCodes'

const application = import.meta.env.VITE_APPLICATION

const listSessionVote: Ref<Storage[]> = useStorage(VOTED_CODES_KEY, [])
const { t, locale } = useI18n()

const mappingApplications = {
  summonersWar: {
    gameTitle: 'Summoners War',
    descriptionKey: 'defaultDescriptionTitle',
    imgUrl: './summonersWarBgImage.jpg'
  },
  genshinImpact: {
    gameTitle: 'Genshin Impact',
    descriptionKey: 'defaultDescriptionTitle',
    imgUrl: './genshinImpactBgImage.webp'
  },
  honkaiStarRail: {
    gameTitle: 'Honkai Star Rail',
    descriptionKey: 'defaultDescriptionTitle',
    imgUrl: './honkaiStarRailBgImage.jpg'
  }
}

const codes: Ref<Code[]> = ref([])
const awardItems: Ref<AwardItem[]> = ref([])
const displayAddCodeForm = ref(false)
const isCopied = ref()
const codeHover = ref()

onMounted(async () => {
  await Promise.all([getCodes(), getAwardItems()])
})

//COMPUTED
const appInfos = computed(() => application && mappingApplications[application.toString()])

const appStyle = computed(() => {
  return {
    background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${appInfos.value.imgUrl}) no-repeat`,
    backgroundSize: 'cover'
  }
})

//METHODS
const handleClickAddCode = () => {
  displayAddCodeForm.value = true
}

const handleClickCopy = async (code: Code) => {
  try {
    if (code.status === 'active') {
      await navigator.clipboard.writeText(code.code)
      if (timeoutCopy) clearTimeout(timeoutCopy)
      isCopied.value = code.id
      timeoutCopy = setTimeout(() => {
        isCopied.value = undefined
      }, 2000) // Reset after 2 seconds
    }
  } catch (error) {
    console.error('Failed to copy text:', error)
  }
}

const handlClickThumb = async (promoCode: Code, variation: 'plus' | 'minus') => {
  if (promoCode.id) {
    const alreadyVotedIdx = listSessionVote.value.findIndex(
      (vote: Storage) => vote.promoCodeId === promoCode.id
    )
    let numberUpvote = 0
    let numberDownvote = 0
    if (alreadyVotedIdx === -1) {
      listSessionVote.value.push({ promoCodeId: promoCode.id, variation })
      numberUpvote = variation === 'plus' ? 1 : 0
      numberDownvote = variation === 'plus' ? 0 : 1
    } else {
      //If same variation we clicked on the button for unselect
      if (listSessionVote.value[alreadyVotedIdx].variation === variation) {
        listSessionVote.value = listSessionVote.value.splice(alreadyVotedIdx, alreadyVotedIdx)
        numberUpvote = variation === 'plus' ? -1 : 0
        numberDownvote = variation === 'plus' ? 0 : -1
      } else {
        //Else we change the variation
        listSessionVote.value[alreadyVotedIdx] = { promoCodeId: promoCode.id, variation }
        numberUpvote = variation === 'plus' ? 1 : -1
        numberDownvote = variation === 'plus' ? -1 : 1
      }
    }
    //Update count on front size to not make getAll code
    codes.value = codes.value.map((code) => {
      if (code.id && code.id === promoCode.id) {
        return {
          ...code,
          upVote: code.upVote + numberUpvote >= 0 ? code.upVote + numberUpvote : 0,
          downVote: code.downVote + numberDownvote >= 0 ? code.downVote + numberDownvote : 0
        }
      } else {
        return code
      }
    })

    //Update db
    await service.updatePromoCode(
      {
        ...promoCode,
        upVote: promoCode.upVote + numberUpvote >= 0 ? promoCode.upVote + numberUpvote : 0,
        downVote: promoCode.downVote + numberDownvote >= 0 ? promoCode.downVote + numberDownvote : 0
      },
      promoCode.id
    )
  }
}

const getCodes = async () => {
  if (application) {
    const data = await service.getAllPromoCodesFromApplication(application?.toString() ?? '')
    codes.value = data ?? []
  }
}

const getAwardItems = async () => {
  if (application) {
    const data = await service.getAllAwardItemsFromApplication(application?.toString() ?? '')
    awardItems.value = data ?? []
  }
}

const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement
  locale.value = target.value
}

//WATCH

watch(
  () => application,
  async () => {
    await Promise.all([getCodes(), getAwardItems()])
  }
)
</script>

<template>
  <div v-if="appInfos" :style="appStyle" class="h-screen p-5 w-full pt-[100px] overflow-scroll">
    <AddCodeForm
      v-if="displayAddCodeForm"
      :application="application?.toString()"
      :awardItems="awardItems"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      @close="displayAddCodeForm = false"
      @submit="getCodes()"
    />
    <select v-model="locale" @change="changeLocale">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="cn">中文</option>
      <option value="ja">日本語</option>
    </select>
    <div class="mx-auto max-w-[1200px] w-full flex flex-col gap-20 text-white">
      <div class="appInfos text-center flex flex-col gap-2">
        <div class="font-semibold text-4xl">{{ appInfos.gameTitle }}</div>
        <div class="font-medium text-lg">{{ t(appInfos.descriptionKey) }}</div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <button
          @click="handleClickAddCode"
          class="text-sm flex ml-auto rounded bg-gray-50 px-2 py-1 text-[#2e2e5f] cursor-pointer hover:bg-gray-200"
        >
          {{ t('addNewCodeButton') }}
        </button>
        <div v-if="codes && codes.length > 0">
          <table class="w-full bg-[#2e2e5fbf] [&_th]:border [&_td]:border">
            <thead>
              <tr class="[&>th]:px-3 [&>th]:py-2 text-left">
                <th>{{ t('code') }}</th>
                <th>{{ t('awards') }}</th>
                <th class="text-center">{{ t('vote') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(code, idxCode) in codes"
                :key="`code_${idxCode}`"
                class="[&>td]:px-3 [&>td]:py-2 [&>td]:h-full text-left"
                :class="{ 'bg-[#2e2e5fdf]': codeHover === code.id }"
              >
                <td
                  class="w-[300px] relative"
                  :class="{ 'cursor-pointer': code.status === 'active' }"
                  @mouseenter="
                    () => {
                      if (code.status === 'active') codeHover = code.id
                    }
                  "
                  @mouseleave="codeHover = undefined"
                  @click="handleClickCopy(code)"
                >
                  <div class="flex items-center">
                    <FontAwesomeIcon
                      :icon="['fas', code.status === 'active' ? 'check' : 'ban']"
                      :class="code.status === 'active' ? 'text-green-500' : 'text-red-500'"
                    />
                    <span
                      class="ml-2 max-w-[220px] break-all overflow-hidden line-clamp-3"
                      :class="{ 'text-green-500': isCopied === code.id }"
                    >
                      {{ isCopied === code.id ? 'Copied!' : code.code }}
                    </span>
                    <FontAwesomeIcon
                      size="lg"
                      class="ml-3 absolute right-4"
                      v-if="code.status === 'active'"
                      :icon="['fas', 'copy']"
                      :class="isCopied === code.id ? 'text-green-500' : ''"
                    />
                  </div>
                </td>
                <td>
                  <ul v-if="code.awardDetails?.length > 0" class="mt-2">
                    <li
                      v-for="(awardDetail, idxAward) in code.awardDetails"
                      :key="`code_${idxCode}_awardDetail_${idxAward}`"
                      class="flex items-center"
                    >
                      <img v-if="awardDetail.image" :src="awardDetail.image" class="w-10 mr-2" />
                      <span v-else class="mr-2">- {{ awardDetail.label }}</span>
                      <span> x{{ awardDetail.count }}</span>
                    </li>
                  </ul>
                </td>
                <td class="w-[200px]">
                  <div class="flex items-center gap-5 justify-center">
                    <div class="flex flex-col gap-2">
                      <FontAwesomeIcon
                        class="cursor-pointer text-green-500"
                        size="xl"
                        :icon="[
                          listSessionVote.findIndex(
                            (sessionVote: Storage) =>
                              sessionVote.promoCodeId === code.id &&
                              sessionVote.variation === 'plus'
                          ) === -1
                            ? 'far'
                            : 'fas',
                          'thumbs-up'
                        ]"
                        @click="handlClickThumb(code, 'plus')"
                      />
                      <FontAwesomeIcon
                        class="cursor-pointer text-red-500"
                        size="xl"
                        :icon="[
                          listSessionVote.findIndex(
                            (sessionVote: Storage) =>
                              sessionVote.promoCodeId === code.id &&
                              sessionVote.variation === 'minus'
                          ) === -1
                            ? 'far'
                            : 'fas',
                          'thumbs-down'
                        ]"
                        @click="handlClickThumb(code, 'minus')"
                      />
                    </div>
                    <div
                      class="w-5"
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
