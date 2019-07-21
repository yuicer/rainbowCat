import Phaser from 'phaser'
import { getRandomNum, getRandomAngle } from '@/utils'

import { ENEMY_CONFIG } from '@/config'

const margin = 30
const { smallEnemy, middleEnemy, bossEnemy } = ENEMY_CONFIG

export default class enemyFactory {
  constructor(scene) {
    this.scene = scene
    const { width, height } = scene.sys.canvas
    this.width = width
    this.height = height

    this.enemies = scene.enemies
    this.enemyBullets = scene.enemyBullets
    this.player = scene.player

    this.isBossShow = false

    this.smallEnemyLastGenerateTime = 0
    this.middleEnemyLastGenerateTime = 0
  }

  generate(time) {
    if (this.isBossShow) {
      return
    }

    // 1分钟稳定出 boss
    if (time - this.scene.initialTime > bossEnemy.extra.showTime) {
      this.isBossShow = true
      this.getBossEnemy()
    }

    // 间隔时间内出小飞机
    if (
      time - this.smallEnemyLastGenerateTime >
      smallEnemy.generateGapTime + getRandomNum([-1500, -800, 800, 1500])
    ) {
      this.smallEnemyLastGenerateTime = time

      // 几率出飞机群
      if (Math.random() > middleEnemy.appearRate) this.getGroupSmallEnemy()
      this.getSmallEnemy()
    }

    // 间隔时间内出中飞机
    if (
      time - this.middleEnemyLastGenerateTime >
      middleEnemy.generateGapTime + getRandomNum([-1500, -800, 800, 1500])
    ) {
      this.middleEnemyLastGenerateTime = time
      this.getMiddleEnemy()
    }
  }

  getGroupSmallEnemy() {
    const start = Math.random() > 0.5 ? margin : this.height / 2

    for (let index = 0; index < smallEnemy.groupNum - 1; index++) {
      const y = start + index * (smallEnemy.height + 10)
      this.enemies
        .get(this.width - margin, y, smallEnemy.pic)
        .setType(smallEnemy.type)
        .setActive(true)
        .setVisible(true)
        .setVelocityX(-smallEnemy.speed)
    }
  }

  getSmallEnemy() {
    this.enemies
      .get(
        this.width - margin,
        Phaser.Math.Between(margin, this.height - margin),
        smallEnemy.pic
      )
      .setType(smallEnemy.type)
      .setActive(true)
      .setVisible(true)
      .setVelocityX(-smallEnemy.speed)
  }

  getMiddleEnemy() {
    const angle = getRandomAngle(30, -30)
    this.enemies
      .get(
        this.width - margin,
        Phaser.Math.Between(this.height / 2 + margin, this.height / 2 - margin),
        middleEnemy.pic
      )
      .setType(middleEnemy.type)
      .setActive(true)
      .setVisible(true)
      .setVelocity(
        -middleEnemy.speed * +Math.cos(angle).toFixed(2),
        middleEnemy.speed * +Math.sin(angle).toFixed(2)
      )
  }

  getBossEnemy() {
    this.enemies
      .get(this.width - bossEnemy.width / 2, this.height / 2, bossEnemy.pic)
      .setType(bossEnemy.type)
      .setActive(true)
      .setVisible(true)
      .setVelocityY(-bossEnemy.speed)
      .setCollideWorldBounds(true)
      .setBounce(true)
  }
}
