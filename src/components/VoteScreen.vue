<script setup>
defineProps({
  active: Boolean,
  votes: { type: Array, required: true },
  votedId: { type: String, default: '' }
})
defineEmits(['back', 'vote'])
</script>

<template>
  <section class="screen vote" :class="{ active }">
    <div class="head">
      <button class="back" @click="$emit('back')">← 返回</button>
      <h2 class="title">下一期做什么？</h2>
    </div>
    <p class="note">投一票，催更你最想测的那个（一人一票）</p>

    <div class="list">
      <button
        v-for="v in votes"
        :key="v.id"
        class="item"
        :class="{ picked: v.picked, locked: votedId && !v.picked }"
        @click="$emit('vote', v.id)"
      >
        <span class="label">{{ v.label }}</span>
        <span class="count">{{ v.count.toLocaleString('en-US') }}</span>
        <span v-if="v.picked" class="check">已投</span>
      </button>
    </div>

    <p v-if="votedId" class="thanks">谢谢你的这一票，下一期见 ψ(｀∇´)ψ</p>
    <p v-else class="thanks">票数只是个气氛组，你的选择才是重点。</p>
  </section>
</template>

<style scoped>
.vote {
  padding: calc(18px + var(--sat)) 20px calc(24px + var(--sab));
  overflow-y: auto;
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
}

.note {
  font-size: 12.5px;
  color: var(--ink-3);
  margin: 12px 0 16px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 16px;
  font-family: inherit;
  font-size: 14.5px;
  color: var(--ink-1);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.item:hover {
  border-color: var(--ink-2);
}
.item.picked {
  border-color: var(--ink-1);
  background: var(--accent-soft);
}
.item.locked {
  color: var(--ink-3);
}

.label {
  flex: 1;
  line-height: 1.5;
}
.count {
  font-size: 12px;
  color: var(--ink-3);
  font-variant-numeric: tabular-nums;
  flex: 0 0 auto;
}
.check {
  font-size: 11px;
  border: 1px solid var(--ink-1);
  padding: 2px 7px;
  flex: 0 0 auto;
}

.thanks {
  margin-top: 18px;
  font-size: 12px;
  color: var(--ink-3);
  line-height: 1.8;
}
</style>
