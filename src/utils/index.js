export function getRandomNum(arr = []) {
  if (!arr[0]) return 0

  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomAngle(startNum, endNum) {
  const startAngle = ((startNum / 90) * Math.PI) / 2
  const endAngle = ((endNum / 90) * Math.PI) / 2

  return getRandomNum([startAngle, endAngle])
}
