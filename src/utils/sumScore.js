import $store from '@/store'
export default function sumScore() {
  let score = 0
  $store.destroiedEnemies.forEach(item => {
    score += item.score
  })

  // 两分内算正分数
  const timeScore = $store.isWin ? 1000 * 60 * 2 - $store.totalTime : 0
  score += timeScore

  return score
}
