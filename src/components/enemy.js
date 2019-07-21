import Phaser from 'phaser'
import isOutOfBounds from '@/modules/isOutOfBounds'
import { ENEMY_CONFIG } from '@/config'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, pic) {
    super(scene, x, y, pic)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setDepth(1)
  }
  setType(type) {
    const data = ENEMY_CONFIG[type]
    for (let i in data.extra) {
      this[i] = data.extra[i]
    }

    return this
  }
  update() {
    // 出范围后销毁
    if (isOutOfBounds(this)) {
      this.destroy()
    }
  }
}
