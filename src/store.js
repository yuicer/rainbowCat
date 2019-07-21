// 用作全局存储

let store = {
  score: 0,
  destroiedEnemies: [],
  totalTime: 0,
  isWin: false
}

export default store

export function resetStore() {
  store.score = 0
  store.destroiedEnemies.length = 0
  store.totalTime = 0
  store.isWin = false
  store.session = store.session || undefined
}
