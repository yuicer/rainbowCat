export default function IsOutOfBounds(obj) {
  const { width, height } = obj.scene.sys.canvas
  return (
    obj.x + obj.displayWidth / 2 < 0 ||
    obj.x > width + obj.displayWidth / 2 ||
    obj.y + obj.displayHeight / 2 < 0 ||
    obj.y > height + obj.displayHeight / 2
  )
}
