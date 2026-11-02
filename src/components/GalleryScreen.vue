<script setup>
import DogAvatar from './DogAvatar.vue'
import { DOGS, ORDER } from '../data/dogs'

defineProps({
  active: Boolean,
  highlight: { type: String, default: '' }
})
defineEmits(['back'])

const list = ORDER.map((k) => DOGS[k])
</script>

<template>
  <section class="screen gallery" :class="{ active }">
    <div class="head">
      <button class="back" @click="$emit('back')">← 返回</button>
      <h2 class="title">狗狗图鉴</h2>
    </div>
    <p class="note">8 种狗狗人格，看看你最像哪一只。</p>

    <div class="list">
      <article
        v-for="c in list"
        :key="c.key"
        class="card"
        :class="{ on: c.key === highlight }"
      >
        <div class="card-cat">
          <DogAvatar :breed="c.key" :size="86" :animated="false" :shadow="false" />
        </div>
        <div class="card-main">
          <div class="card-head">
            <span class="dot" :style="{ background: c.color }"></span>
            <h3>{{ c.name }}</h3>
            <span class="tagline">{{ c.tag }}</span>
          </div>
          <div class="tags">
            <span v-for="t in c.tags" :key="t" class="mini">{{ t }}</span>
          </div>
          <p class="desc">{{ c.desc }}</p>
          <p class="pair">
            最佳配对：{{ c.pairName }}（{{ c.combo }}）｜最佳友伴：{{ c.buddyName }}
          </p>
        </div>
      </article>
    </div>

    <div class="footnote foot">
      <div>想再测一次？回到结果页点击「再测一次」即可</div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  padding: calc(18px + var(--sat)) 20px calc(24px + var(--sab));
  overflow-y: auto;
  scrollbar-width: none;
}
.gallery::-webkit-scrollbar {
  display: none;
}

.head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.back {
  appearance: none;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--ink-1);
  padding: 8px 14px;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
}
.title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.note {
  font-size: 12.5px;
  color: var(--ink-3);
  margin: 12px 0 16px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  display: flex;
  gap: 12px;
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 14px 14px 14px 8px;
  transition: border-color 0.25s ease;
}
.card.on {
  border-color: var(--ink-1);
}

.card-cat {
  flex: 0 0 auto;
  width: 86px;
  height: 96px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.card-main {
  flex: 1;
  min-width: 0;
}

.card-head {
  display: flex;
  align-items: baseline;
  gap: 7px;
  flex-wrap: wrap;
}
.dot {
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  transform: translateY(-1px);
}
.card-head h3 {
  font-size: 16px;
  font-weight: 700;
}
.tagline {
  font-size: 12px;
  color: var(--ink-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tags {
  display: flex;
  gap: 5px;
  margin-top: 6px;
  flex-wrap: wrap;
}
.mini {
  font-size: 10.5px;
  color: var(--ink-3);
  border: 1px solid var(--border);
  padding: 2px 7px;
}

.desc {
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--ink-2);
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pair {
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 8px;
}

.foot {
  margin-top: 20px;
}
</style>
