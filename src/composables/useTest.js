import { computed, ref } from 'vue'
import { DOGS, ORDER } from '../data/dogs'
import { QUIZ } from '../data/quiz'

const TOTAL_KEY = 'dogti_total'
const VOTE_KEY = 'dogti_voted'
const BASE_TOTAL = 96420

const VOTE_ITEMS = [
  { id: 'cat', label: '回归猫系：测测你是什么小猫', base: 1842 },
  { id: 'bird', label: '鸟类图鉴：测测你是哪种鸟', base: 1176 },
  { id: 'work', label: '打工篇：测测你的职场动物人格', base: 1503 },
  { id: 'wish', label: '许愿池：下一期你说了算', base: 689 }
]

function readTotal() {
  const raw = Number(localStorage.getItem(TOTAL_KEY))
  return Number.isFinite(raw) && raw > BASE_TOTAL ? raw : BASE_TOTAL
}

// 全员共享的单例状态
const screen = ref('cover')
const idx = ref(0)
const answers = ref({})
const total = ref(readTotal())
const friendKey = ref('')
const votedId = ref(localStorage.getItem(VOTE_KEY) || '')
const toastMsg = ref('')
let toastTimer = 0

export function useTest() {
  const scores = computed(() => {
    const s = {}
    ORDER.forEach((k) => (s[k] = 0))
    Object.values(answers.value).forEach((k) => {
      if (s[k] !== undefined) s[k] += 1
    })
    return s
  })

  const answered = computed(() => Object.keys(answers.value).length)

  const progress = computed(() => ((idx.value + 1) / QUIZ.length) * 100)

  const result = computed(() => {
    const list = Object.values(answers.value)
    let best = 0
    ORDER.forEach((k) => {
      if (scores.value[k] > best) best = scores.value[k]
    })
    const firstSeen = (k) => {
      const i = list.indexOf(k)
      return i < 0 ? 999 : i
    }
    const tops = ORDER.filter((k) => scores.value[k] === best && best > 0)
    tops.sort((a, b) => firstSeen(a) - firstSeen(b))
    const main = tops[0] || 'golden'
    return {
      main,
      dog: DOGS[main],
      extras: tops.slice(1).map((k) => DOGS[k]),
      top: best
    }
  })

  const votes = computed(() =>
    VOTE_ITEMS.map((v) => ({
      ...v,
      count: v.base + (votedId.value === v.id ? 1 : 0),
      picked: votedId.value === v.id
    }))
  )

  function start() {
    answers.value = {}
    idx.value = 0
    screen.value = 'quiz'
  }

  function pick(key) {
    answers.value = { ...answers.value, [idx.value]: key }
  }

  function next() {
    if (idx.value < QUIZ.length - 1) {
      idx.value += 1
      return false
    }
    finish()
    return true
  }

  function back() {
    if (idx.value === 0) return
    const copy = { ...answers.value }
    delete copy[idx.value]
    delete copy[idx.value - 1]
    answers.value = copy
    idx.value -= 1
  }

  function finish() {
    total.value = total.value + 1
    localStorage.setItem(TOTAL_KEY, String(total.value))
    screen.value = 'result'
  }

  function go(name) {
    screen.value = name
  }

  function toast(msg) {
    toastMsg.value = msg
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toastMsg.value = ''), 2200)
  }

  function vote(id) {
    if (votedId.value) return
    votedId.value = id
    localStorage.setItem(VOTE_KEY, id)
    toast('投票成功，谢谢催更')
  }

  function shareUrl() {
    return `${location.origin}${location.pathname}?r=${result.value.main}`
  }

  async function share() {
    const dog = result.value.dog
    const text = `我测出来是「${dog.name} · ${dog.tag}」，你也来测测`
    const url = shareUrl()
    if (navigator.share) {
      try {
        await navigator.share({ title: '测测你的 dogti', text, url })
        return
      } catch (e) {
        if (e && e.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      toast('已复制，去粘贴给朋友吧')
    } catch (e) {
      toast('复制失败，请手动复制链接')
    }
  }

  function readFriend() {
    const key = new URLSearchParams(location.search).get('r')
    if (key && DOGS[key]) friendKey.value = key
  }

  return {
    screen,
    idx,
    answers,
    answered,
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
    finish,
    go,
    toast,
    vote,
    share,
    shareUrl,
    readFriend,
    dogs: ORDER.map((k) => DOGS[k])
  }
}
