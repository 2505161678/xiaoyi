<script setup>
import { ref, watch, computed } from 'vue'
import DogAvatar from './DogAvatar.vue'
import { ORDER } from '../data/dogs'

const props = defineProps({
  active: Boolean,
  idx: { type: Number, default: 0 },
  total: { type: Number, default: 24 },
  question: { type: Object, required: true },
  progress: { type: Number, default: 0 }
})
const emit = defineEmits(['pick', 'advance', 'back'])

const chosen = ref('')

const quizDog = computed(() => ORDER[props.idx % ORDER.length])

watch(
  () => props.idx,
  () => {
    chosen.value = ''
  }
)

function choose(key) {
  if (chosen.value) return
  chosen.value = key
  emit('pick', key)
  window.setTimeout(() => emit('advance'), 300)
}
</script>

<template>
  <section class="screen quiz" :class="{ active }">
    <div class="topbar">
      <button class="prev" :class="{ hide: idx === 0 }" @click="$emit('back')" aria-label="上一题">
        ←
      </button>
      <span class="progress-text">{{ idx + 1 }} / {{ total }}</span>
      <span class="progress-text brand">DOGTI</span>
    </div>

    <div class="bar"><i :style="{ width: progress + '%' }"></i></div>

    <div class="q-card">
      <div class="q-dog"><DogAvatar :breed="quizDog" :size="128" /></div>
      <div class="q-label">{{ question.label }}</div>
      <h2 class="q-title">{{ question.title }}</h2>
    </div>

    <div class="opts">
      <button
        v-for="(opt, i) in question.opts"
        :key="i"
        class="opt"
        :class="{ pick: chosen === opt.k }"
        @click="choose(opt.k)"
      >
        <span class="dot"></span>
        <span class="opt-text">{{ opt.t }}</span>
      </button>
    </div>

    <p class="quiz-foot">没有标准答案，跟着直觉选就好</p>
  </section>
</template>

<style scoped>
.quiz {
  padding: calc(20px + var(--sat)) 24px calc(16px + var(--sab));
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  min-height: 24px;
}

.prev {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--ink-1);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0 6px 0 0;
  font-family: inherit;
  transition: opacity 0.2s ease;
}
.prev.hide {
  opacity: 0;
  pointer-events: none;
}

.progress-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-2);
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
}
.progress-text.brand {
  color: var(--ink-3);
  font-size: 11px;
  letter-spacing: 0.18em;
}

.bar {
  height: 4px;
  background: var(--border);
  overflow: hidden;
}
.bar i {
  display: block;
  height: 100%;
  background: var(--accent);
  transition: width 0.45s var(--ease);
}

.q-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 0 14px;
  min-height: 0;
}

.q-dog {
  width: 128px;
  height: 128px;
  margin-bottom: 6px;
}

.q-label {
  font-size: 11px;
  letter-spacing: 0.26em;
  color: var(--accent-2);
  text-transform: uppercase;
  margin-bottom: 12px;
  font-weight: 600;
}

.q-title {
  font-size: clamp(21px, 6.4vw, 28px);
  font-weight: 800;
  line-height: 1.34;
  letter-spacing: -0.01em;
  text-align: center;
  color: var(--ink-1);
  text-wrap: balance;
}

.opts {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.opt {
  width: 100%;
  text-align: left;
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 15px 18px;
  min-height: 54px;
  font-family: inherit;
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--ink-1);
  cursor: pointer;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.15s var(--ease), border-color 0.2s ease, background 0.2s ease;
}
.opt:hover {
  border-color: var(--ink-2);
}
.opt:active {
  transform: scale(0.985);
}
.opt.pick {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.dot {
  flex: 0 0 auto;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border);
  transition: background 0.2s ease;
}
.opt.pick .dot {
  background: var(--accent);
}
.opt-text {
  flex: 1;
}

.quiz-foot {
  text-align: center;
  font-size: 11px;
  color: var(--ink-3);
  padding-top: 12px;
  letter-spacing: 0.02em;
}

@media (max-height: 720px) {
  .q-dog {
    width: 92px;
    height: 92px;
    margin-bottom: 2px;
  }
  .q-dog :deep(svg) {
    width: 92px !important;
    height: 92px !important;
  }
  .q-title {
    font-size: clamp(19px, 5.6vw, 24px);
  }
  .opt {
    padding: 12px 16px;
    min-height: 48px;
    font-size: 15px;
  }
  .quiz-foot {
    display: none;
  }
}
</style>
