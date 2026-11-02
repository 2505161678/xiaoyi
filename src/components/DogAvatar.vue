<script setup>
import { computed } from 'vue'
import { DOGS } from '../data/dogs'

const props = defineProps({
  breed: { type: String, default: 'shiba' },
  size: { type: Number, default: 160 },
  animated: { type: Boolean, default: true },
  shadow: { type: Boolean, default: true }
})

const dog = computed(() => DOGS[props.breed] || DOGS.shiba)
const ears = computed(() => dog.value.ears)
const mark = computed(() => dog.value.mark)
</script>

<template>
  <svg
    class="dog"
    :class="{ 'is-animated': animated }"
    :width="size"
    :height="size"
    viewBox="0 0 200 200"
    role="img"
    :aria-label="dog.name"
  >
    <ellipse v-if="shadow" class="shadow" cx="100" cy="190" rx="44" ry="4.5" fill="#2A2A28" opacity=".07" />

    <!-- 尾巴 -->
    <path
      v-if="dog.tail === 'curl'"
      class="tail curl"
      d="M138 170c24 2 31-17 18-27-9-7-20 0-15 9"
      :stroke="dog.deep"
      stroke-width="12"
      stroke-linecap="round"
      fill="none"
    />
    <path
      v-else
      class="tail"
      d="M140 172c25 5 41-13 33-35"
      :stroke="dog.deep"
      stroke-width="12"
      stroke-linecap="round"
      fill="none"
    />

    <!-- 身体 -->
    <path
      d="M100 126c-26 0-41 21-41 41 0 13 18 19 41 19s41-6 41-19c0-20-15-41-41-41Z"
      :fill="dog.base"
    />
    <ellipse cx="100" cy="176" rx="23" ry="11" :fill="dog.light" opacity=".95" />
    <rect x="74" y="178" width="21" height="11" rx="5.5" :fill="dog.light" />
    <rect x="105" y="178" width="21" height="11" rx="5.5" :fill="dog.light" />

    <!-- 耳朵：立耳 -->
    <template v-if="ears === 'pointy'">
      <g :transform="dog.bigEars ? 'translate(100 84) scale(1.18) translate(-100 -84)' : ''">
      <path d="M62 66C54 44 48 26 52 23c4-3 24 11 34 21Z" :fill="dog.base" />
      <path d="M138 66c8-22 14-40 10-43-4-3-24 11-34 21Z" :fill="dog.base" />
      <path d="M66 60c-5-14-8-25-6-27 3-2 14 8 21 16Z" :fill="dog.nose" opacity=".42" />
      <path d="M134 60c5-14 8-25 6-27-3-2-14 8-21 16Z" :fill="dog.nose" opacity=".42" />
      </g>
    </template>

    <!-- 耳朵：垂耳 -->
    <template v-else-if="ears === 'floppy'">
      <path
        d="M58 56c-16 4-23 32-17 54 4 16 24 16 28 2 4-16 2-46-1-56Z"
        :fill="dog.deep"
      />
      <path
        d="M142 56c16 4 23 32 17 54-4 16-24 16-28 2-4-16-2-46 1-56Z"
        :fill="dog.deep"
      />
    </template>

    <!-- 耳朵：蝙蝠耳 -->
    <template v-else-if="ears === 'bat'">
      <path
        d="M50 30c-9 0-14 12-10 25 3 11 13 14 19 7 6-7 8-19 4-26-3-5-8-6-13-6Z"
        :fill="dog.base"
      />
      <path
        d="M150 30c9 0 14 12 10 25-3 11-13 14-19 7-6-7-8-19-4-26 3-5 8-6 13-6Z"
        :fill="dog.base"
      />
      <path
        d="M53 36c-6 2-8 11-6 19 2 7 8 8 11 4 3-5 4-13 2-18-1-3-4-6-7-5Z"
        :fill="dog.nose"
        opacity=".35"
      />
      <path
        d="M147 36c6 2 8 11 6 19-2 7-8 8-11 4-3-5-4-13-2-18 1-3 4-6 7-5Z"
        :fill="dog.nose"
        opacity=".35"
      />
    </template>

    <!-- 耳朵：半立耳 -->
    <template v-else>
      <path d="M60 64c-4-20-5-37-1-40 4-3 20 11 27 21Z" :fill="dog.base" />
      <path d="M140 64c4-20 5-37 1-40-4-3-20 11-27 21Z" :fill="dog.base" />
      <path d="M59 24c7 5 15 13 21 19-3-11-13-20-21-19Z" :fill="dog.deep" />
      <path d="M141 24c-7 5-15 13-21 19 3-11 13-20 21-19Z" :fill="dog.deep" />
    </template>

    <!-- 头 -->
    <path
      d="M100 38c-34 0-52 22-52 46 0 26 22 44 52 44s52-18 52-44c0-24-18-46-52-46Z"
      :fill="dog.base"
    />

    <!-- 花纹：面罩（哈士奇） -->
    <template v-if="mark === 'mask'">
      <ellipse cx="78" cy="82" rx="17" ry="15" :fill="dog.deep" opacity=".92" />
      <ellipse cx="122" cy="82" rx="17" ry="15" :fill="dog.deep" opacity=".92" />
      <path d="M100 40c-7 0-12 8-12 18v30h24V58c0-10-5-18-12-18Z" :fill="dog.light" opacity=".9" />
      <ellipse cx="100" cy="112" rx="24" ry="18" :fill="dog.light" />
    </template>

    <!-- 花纹：眼罩斑（边牧） -->
    <path
      v-else-if="mark === 'patch'"
      d="M46 78c-5-24 13-42 35-40 10 1 13 11 5 19-10 10-24 10-30 30-4 10-9 1-10-9Z"
      :fill="dog.deep"
      opacity=".95"
    />

    <!-- 花纹：鼻梁白（柴犬 / 柯基） -->
    <path
      v-else-if="mark === 'blaze'"
      d="M91 40c5-5 13-5 18 0 6 16 7 32 5 52H86c-2-20-1-36 5-52Z"
      :fill="dog.light"
      opacity=".95"
    />

    <!-- 口鼻 -->
    <ellipse cx="100" cy="112" rx="21" ry="16" :fill="mark === 'mask' ? dog.light : dog.light" />
    <path d="M91 100q9-6 18 0 1 7-9 11-10-4-9-11Z" :fill="dog.nose" stroke-linejoin="round" />
    <path
      d="M100 111v6M100 117c-4 7-12 6-14 1M100 117c4 7 12 6 14 1"
      stroke="#2A2A28"
      stroke-width="2.2"
      stroke-linecap="round"
      fill="none"
      opacity=".7"
    />

    <!-- 舌头 -->
    <path
      v-if="dog.tongue"
      d="M94 121q6 9 12 0 0 11-6 12-6-1-6-12Z"
      fill="#E08C86"
      opacity=".95"
    />

    <!-- 眼睛 -->
    <g class="eye eye-l">
      <ellipse cx="78" cy="84" rx="7.5" ry="9" :fill="dog.eye" />
      <ellipse cx="78" cy="86" rx="4.2" ry="6.6" fill="#221F1B" />
      <circle cx="75.6" cy="81" r="2.2" fill="#fff" opacity=".92" />
    </g>
    <g class="eye eye-r">
      <ellipse cx="122" cy="84" rx="7.5" ry="9" :fill="dog.eye" />
      <ellipse cx="122" cy="86" rx="4.2" ry="6.6" fill="#221F1B" />
      <circle cx="119.6" cy="81" r="2.2" fill="#fff" opacity=".92" />
    </g>

    <!-- 柴犬眉点 -->
    <template v-if="dog.brows">
      <ellipse cx="78" cy="67" rx="7.5" ry="3.6" :fill="dog.light" />
      <ellipse cx="122" cy="67" rx="7.5" ry="3.6" :fill="dog.light" />
    </template>

    <!-- 泰迪卷毛 -->
    <template v-if="dog.curls">
      <g :fill="dog.deep" opacity=".22">
        <circle cx="86" cy="50" r="9" />
        <circle cx="100" cy="44" r="10" />
        <circle cx="114" cy="50" r="9" />
        <circle cx="58" cy="86" r="7" />
        <circle cx="142" cy="86" r="7" />
        <circle cx="56" cy="104" r="6" />
        <circle cx="144" cy="104" r="6" />
      </g>
    </template>
  </svg>
</template>

<style scoped>
.dog {
  display: block;
  overflow: visible;
}
.tail,
.eye {
  transform-box: fill-box;
}
.tail {
  transform-origin: 8% 92%;
}
.eye {
  transform-origin: center;
}
.is-animated .tail {
  animation: tail-wag 3.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.is-animated .tail.curl {
  transform-origin: 10% 90%;
  animation: tail-curl 4.6s ease-in-out infinite;
}
.is-animated .eye {
  animation: blink 6.2s infinite;
}
.is-animated .eye-r {
  animation-delay: 0.05s;
}
@keyframes tail-wag {
  0%,
  100% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(9deg);
  }
}
@keyframes tail-curl {
  0%,
  100% {
    transform: rotate(-2deg) scale(1);
  }
  50% {
    transform: rotate(3deg) scale(1.03);
  }
}
@keyframes blink {
  0%,
  93%,
  100% {
    transform: scaleY(1);
  }
  96% {
    transform: scaleY(0.08);
  }
}
@media (prefers-reduced-motion: reduce) {
  .is-animated .tail,
  .is-animated .eye {
    animation: none;
  }
}
</style>
