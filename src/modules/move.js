import { USER_SPEED } from '@/config'

export default function move(
  puppet,
  { keyW, keyA, keyS, keyD },
  speed = USER_SPEED
) {
  if (!puppet) return
  let x = 0,
    y = 0

  if (keyW.isDown) y -= speed
  if (keyA.isDown) x -= speed
  if (keyS.isDown) y += speed
  if (keyD.isDown) x += speed

  puppet.setPosition(puppet.x + x, puppet.y + y)
}
