import Phaser from 'phaser'
import isOutOfBounds from '@/modules/isOutOfBounds'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, pic) {
    super(scene, x, y, pic)
  }

  fire(shooter, target) {
    // 初始未知
    this.setPosition(shooter.x, shooter.y - 10)
    this.setDepth(0)
    // 没有目标就向 x 轴射击

    let xSpeed, ySpeed
    // 4 位小数
    const precision = 10000
    if (target) {
      const direction = Math.atan2(this.y - target.y, this.x - target.x)

      xSpeed =
        Math.floor(precision * this.bulletSpeed * -Math.cos(direction)) /
        precision
      ySpeed =
        Math.floor(precision * this.bulletSpeed * -Math.sin(direction)) /
        precision
    } else {
      xSpeed = this.bulletSpeed
      ySpeed = 0
    }
    this.setVelocity(xSpeed, ySpeed)
    this.rotation = shooter.rotation
    this.timer = 0

    return this
  }

  setSpeed(speed) {
    this.bulletSpeed = speed
    return this
  }

  setAngle(angle) {
    const precision = 10000
    this.setVelocity(
      -Math.floor(precision * this.bulletSpeed * Math.cos(angle)) / precision,
      Math.floor(precision * this.bulletSpeed * Math.sin(angle)) / precision
    )
    return this
  }

  update() {
    if (isOutOfBounds(this)) {
      this.destroy()
    }
  }
}
