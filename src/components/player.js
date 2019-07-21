import { PLAYER_CONFIG } from '@/config'
const { pic, extra, width, height } = PLAYER_CONFIG
import Phaser from 'phaser'
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, pic)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
      .setDepth(1)
      .setSize(width, height)
      .setOffset(width, 0)

    for (let i in extra) {
      this[i] = extra[i]
    }
  }
}
