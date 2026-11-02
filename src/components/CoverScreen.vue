<script setup>
import { computed } from 'vue'
import DogAvatar from './DogAvatar.vue'
import DogWordmark from './DogWordmark.vue'
import { DOGS } from '../data/dogs'

const props = defineProps({
  active: Boolean,
  total: { type: Number, default: 0 },
  friendKey: { type: String, default: '' }
})
defineEmits(['start'])

const friend = computed(() => (props.friendKey ? DOGS[props.friendKey] : null))
const totalText = computed(() => props.total.toLocaleString('en-US'))
</script>

<template>
  <section class="screen cover" :class="{ active }">
    <div class="wordmark">
      <span>d</span><DogWordmark /><span>gti</span>
    </div>
    <p class="kicker cover-kicker">Dog Personality Index</p>
    <p class="cover-sub">测测你是什么小狗<span class="face">(๑•̀ㅂ•́)و</span></p>

    <div class="dog-stage">
      <DogAvatar breed="shiba" :size="212" />
    </div>

    <button class="btn start-btn" @click="$emit('start')">开始测试</button>
    <p class="hint">1min · 24 题 · 测测你是什么性格的小狗</p>
    <p class="count">已测试人数：{{ totalText }}</p>

    <div v-if="friend" class="friend-card">
      <div class="friend-label">朋友的结果</div>
      <div class="friend-main">
        <span class="friend-dot" :style="{ background: friend.color }"></span>
        <b>{{ friend.name }}</b>
        <span class="friend-tag">{{ friend.tag }}</span>
      </div>
      <button class="friend-btn" @click="$emit('start')">我也来测 →</button>
    </div>

    <div class="footnote cover-foot">
      <div>8 种狗狗人格 · 24 道生活情境题 · 结果仅供娱乐</div>
      <div>分享链接会带上你的结果，朋友点开就能看</div>
      <div class="warn">© 2026 dogti · 请勿用于任何专业判断</div>
    </div>

    <div class="wave" aria-hidden="true">
      <svg viewBox="0 0 560 120" preserveAspectRatio="none">
        <path d="M0 72c74-26 128 8 196 4s96-34 172-30 118 34 192 22v52H0Z" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.cover {
  padding: calc(44px + var(--sat)) 26px calc(20px + var(--sab));
  align-items: center;
  text-align: center;
}

.wordmark {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: clamp(56px, 18vw, 76px);
  font-weight: 800;
  letter-spacing: -0.045em;
  color: var(--ink-1);
  z-index: 2;
}

.cover-kicker {
  margin-top: 18px;
}

.cover-sub {
  margin-top: 14px;
  font-size: 20px;
  line-height: 1.45;
  font-weight: 600;
  color: var(--ink-1);
  letter-spacing: -0.01em;
}

.face {
  display: inline-block;
  font-weight: 300;
  color: var(--ink-2);
  transform: translateY(1px);
}

.dog-stage {
  width: 212px;
  height: 212px;
  margin: 6px auto 2px;
  position: relative;
}
.dog-stage::before {
  content: '';
  position: absolute;
  inset: 22px 16px 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 45%, rgba(201, 123, 74, 0.22), transparent 68%);
  z-index: 0;
}
.dog-stage :deep(svg) {
  position: relative;
  z-index: 1;
}

.start-btn {
  margin-top: 6px;
  min-width: 208px;
}

.hint {
  margin-top: 16px;
  font-size: 12px;
  color: var(--ink-3);
  letter-spacing: 0.04em;
}

.count {
  margin-top: 10px;
  font-size: 12px;
  color: var(--ink-3);
  font-variant-numeric: tabular-nums;
}

.friend-card {
  margin-top: 18px;
  width: 100%;
  max-width: 330px;
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 14px 16px;
  text-align: left;
}
.friend-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 8px;
}
.friend-main {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: var(--ink-1);
}
.friend-main b {
  font-weight: 700;
}
.friend-dot {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
}
.friend-tag {
  font-size: 12px;
  color: var(--ink-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.friend-btn {
  appearance: none;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-1);
  padding: 10px 0 0;
  cursor: pointer;
  letter-spacing: 0.02em;
}

.cover-foot {
  margin-top: auto;
  padding-top: 22px;
  position: relative;
  z-index: 2;
}

.wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 96px;
  pointer-events: none;
  opacity: 0.22;
}
.wave path {
  fill: #d9d6cd;
}

@media (max-height: 700px) {
  .cover {
    padding-top: calc(28px + var(--sat));
  }
  .dog-stage {
    width: 168px;
    height: 168px;
    margin-top: 0;
  }
  .dog-stage :deep(svg) {
    width: 168px !important;
    height: 168px !important;
  }
  .cover-sub {
    font-size: 18px;
  }
  .wordmark {
    font-size: clamp(48px, 16vw, 62px);
  }
}
</style>
