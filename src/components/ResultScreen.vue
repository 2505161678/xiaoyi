<script setup>
import { computed, ref } from 'vue'
import DogAvatar from './DogAvatar.vue'
import { DIMS } from '../data/dogs'

const props = defineProps({
  active: Boolean,
  result: { type: Object, required: true },
  scores: { type: Object, required: true }
})
const emit = defineEmits(['again', 'gallery', 'vote', 'share'])

const qrOk = ref(true)
// 赞赏码放 public/donate.png，缺省时整块自动隐藏
const donateSrc = `${import.meta.env.BASE_URL}donate.png`

const dog = computed(() => props.result.dog)

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

const heroStyle = computed(() => ({
  background: `linear-gradient(180deg, ${hexA(dog.value.color, 0.22)}, ${hexA(
    dog.value.color,
    0.05
  )} 58%, transparent)`
}))

const maxScore = computed(() => Math.max(1, ...Object.values(props.scores)))

const bars = computed(() =>
  DIMS.map((d) => {
    const v = props.scores[d.key] || 0
    return {
      key: d.key,
      label: d.label,
      value: v,
      height: Math.max(3, Math.round((v / maxScore.value) * 100)),
      isMain: d.key === props.result.main
    }
  })
)
</script>

<template>
  <section class="screen result" :class="{ active }">
    <div class="res-hero" :style="heroStyle">
      <div class="res-cat"><DogAvatar :breed="result.main" :size="148" /></div>
      <div class="res-label">你的狗狗人格</div>
      <h1 class="res-name">{{ dog.name }}</h1>
      <p class="res-title">—— {{ dog.tag }}</p>
    </div>

    <div class="res-body">
      <p class="res-desc">{{ dog.desc }}</p>

      <div v-if="result.extras.length" class="sub-list">
        <div v-for="e in result.extras" :key="e.key" class="sub-cat">
          你身上还带一点 <b>{{ e.name }} · {{ e.tag }}</b> 的影子
        </div>
      </div>

      <div class="tags">
        <span v-for="t in dog.tags" :key="t" class="tag">{{ t }}</span>
      </div>

      <div class="chart-box">
        <div class="chart-title">你的性格八维</div>
        <div class="chart">
          <div v-for="(b, i) in bars" :key="b.key" class="bar-item">
            <div class="bar-track">
              <div
                class="bar-fill"
                :class="{ main: b.isMain }"
                :style="{ height: b.height + '%', transitionDelay: 60 + i * 55 + 'ms' }"
              ></div>
            </div>
            <div class="bar-label">{{ b.label }}</div>
            <div class="bar-val">{{ b.value }}</div>
          </div>
        </div>
      </div>

      <div class="pair-box">
        <div class="pair-item">
          最佳配对狗狗：<b>{{ dog.pairName }} · {{ dog.pairTag }}</b
          >（{{ dog.combo }}）
        </div>
        <div class="pair-item">最佳友伴狗狗：<b>{{ dog.buddyName }} · {{ dog.buddyTag }}</b></div>
      </div>

      <p class="res-count">「{{ dog.name }}」狗狗大军 +1 (/▽＼)</p>

      <div class="actions">
        <div class="row">
          <button class="btn ghost" @click="emit('again')">再测一次</button>
          <button class="btn ghost" @click="emit('gallery')">狗狗图鉴</button>
        </div>
        <button class="btn ghost vote-btn" @click="emit('vote')">🗳️ 投票：下一期做什么</button>
        <button class="btn" @click="emit('share')">分享给朋友</button>
      </div>
      <p class="share-note">分享链接会带上你的结果，朋友点开就能看</p>

      <div v-if="qrOk" class="support">
        <div class="support-text">如果这个测试让你笑了一下，请作者喝杯奶茶 (╹ڡ╹ )</div>
        <img class="support-img" :src="donateSrc" alt="赞赏码" @error="qrOk = false" />
      </div>

      <div class="footnote foot">
        <div class="warn">结果仅供娱乐，请勿作为任何专业判断依据</div>
        <div>© 2026 dogti · 8 种狗狗人格 · 24 道生活情境题</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.result {
  padding: calc(20px + var(--sat)) 0 calc(24px + var(--sab));
  overflow-y: auto;
  scrollbar-width: none;
}
.result::-webkit-scrollbar {
  display: none;
}

.res-hero {
  padding: 22px 24px 26px;
  text-align: center;
  transition: background 0.5s ease;
}

.res-cat {
  width: 148px;
  height: 148px;
  margin: 0 auto 8px;
}

.res-label {
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ink-2);
  font-weight: 600;
}

.res-name {
  font-size: clamp(32px, 9.4vw, 46px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin-top: 6px;
}

.res-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink-1);
  opacity: 0.72;
  margin-top: 8px;
}

.res-body {
  padding: 0 24px;
}

.res-desc {
  font-size: 15.5px;
  line-height: 1.95;
  color: var(--ink-2);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 22px 20px;
  font-weight: 400;
  white-space: pre-wrap;
}

.sub-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sub-cat {
  background: var(--panel);
  border: 1px solid var(--border);
  padding: 13px 16px;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.6;
}
.sub-cat b {
  color: var(--ink-1);
  font-weight: 600;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.chart-box {
  margin-top: 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 16px 14px 12px;
}
.chart-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 14px;
}
.chart {
  display: flex;
  gap: 6px;
  align-items: flex-end;
}
.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  min-width: 0;
}
.bar-track {
  width: 100%;
  height: 108px;
  display: flex;
  align-items: flex-end;
  background: var(--panel);
}
.bar-fill {
  width: 100%;
  background: #c9c6bd;
  min-height: 2px;
  transition: height 0.7s var(--ease);
}
.bar-fill.main {
  background: var(--ink-1);
}
.bar-label {
  font-size: 10px;
  color: var(--ink-3);
  white-space: nowrap;
}
.bar-val {
  font-size: 10px;
  color: var(--ink-2);
  font-variant-numeric: tabular-nums;
}

.pair-box {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.pair-item {
  background: var(--panel);
  border: 1px solid var(--border);
  padding: 13px 16px;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.6;
}
.pair-item b {
  color: var(--ink-1);
  font-weight: 600;
}

.res-count {
  font-size: 12.5px;
  color: var(--ink-2);
  text-align: center;
  margin-top: 18px;
  letter-spacing: 0.02em;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}
.row {
  display: flex;
  gap: 10px;
}
.row .btn {
  flex: 1;
}
.vote-btn {
  font-size: 14px;
}

.share-note {
  font-size: 12px;
  color: var(--ink-3);
  margin-top: 10px;
  text-align: center;
}

.support {
  margin-top: 22px;
  padding: 20px;
  background: var(--bg);
  border: 1px solid var(--border);
  text-align: center;
}
.support-text {
  font-size: 13.5px;
  color: var(--ink-2);
  line-height: 1.7;
  margin-bottom: 14px;
}
.support-img {
  width: 190px;
  height: 190px;
  object-fit: contain;
}

.foot {
  margin-top: 24px;
  padding-bottom: 8px;
}
</style>
