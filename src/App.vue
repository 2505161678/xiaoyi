<script setup>
import { onMounted } from 'vue'
import { useTest } from './composables/useTest'
import { QUIZ } from './data/quiz'
import CoverScreen from './components/CoverScreen.vue'
import QuizScreen from './components/QuizScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import GalleryScreen from './components/GalleryScreen.vue'
import VoteScreen from './components/VoteScreen.vue'

const {
  screen,
  idx,
  total,
  friendKey,
  votedId,
  votes,
  toastMsg,
  scores,
  progress,
  result,
  start,
  pick,
  next,
  back,
  go,
  vote,
  share,
  readFriend
} = useTest()

onMounted(() => {
  readFriend()
})

function onAdvance() {
  next()
}
</script>

<template>
  <div class="phone">
    <CoverScreen
      :active="screen === 'cover'"
      :total="total"
      :friend-key="friendKey"
      @start="start"
    />

    <QuizScreen
      :active="screen === 'quiz'"
      :idx="idx"
      :total="QUIZ.length"
      :question="QUIZ[idx]"
      :progress="progress"
      @pick="pick"
      @advance="onAdvance"
      @back="back"
    />

    <ResultScreen
      :active="screen === 'result'"
      :result="result"
      :scores="scores"
      @again="start"
      @gallery="go('gallery')"
      @vote="go('vote')"
      @share="share"
    />

    <GalleryScreen :active="screen === 'gallery'" :highlight="result.main" @back="go('result')" />

    <VoteScreen
      :active="screen === 'vote'"
      :votes="votes"
      :voted-id="votedId"
      @back="go('result')"
      @vote="vote"
    />

    <div class="toast" :class="{ show: !!toastMsg }">{{ toastMsg }}</div>
  </div>
</template>
