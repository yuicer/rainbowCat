import { Scene } from 'phaser'
import { GAME_BG, GAME_BG_SPEED } from '@/config'

import Player from '@/components/player'
import Enemy from '@/components/enemy'
import Bullet from '@/components/bullet'
import Animations from '@/components/animations'
import Contrler from '@/components/contrler'
import EnemyFactory from '@/components/enemyFactory'
import EnemyCommander from '@/components/enemyCommander'

import move from '@/modules/move'
import hit from '@/modules/hit'

export default class Round1 extends Scene {
  constructor() {
    super({ key: 'round1' })

    this.bg = null
    this.player = null
    this.enemies = 0
    this.playerBullets = 0
    this.initialTime = null
  }
  create() {
    const { width, height } = this.sys.canvas

    new Animations(this)
    this.keys = new Contrler(this)

    this.bgm = this.sound.add('bgm')
    this.bgm.play()

    // 背景
    this.bg = this.add
      .tileSprite(width / 2, height / 2, width, height, GAME_BG)
      .setTileScale(1.3)

    // 玩家
    this.player = new Player(this, 120, height / 2)

    // 敌人组
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true
    })

    //玩家子弹组
    this.playerBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })
    this.playerBullets.lastFiredTime = 0

    // 敌人子弹组
    this.enemyBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

    // 敌人工厂
    this.enemyFactory = new EnemyFactory(this)
    // 敌人
    this.enemyCommander = new EnemyCommander(this)

    // 碰撞
    this.physics.add.overlap(
      this.enemies.getChildren(),
      this.playerBullets.getChildren(),
      (...arr) => hit(arr, this)
    )

    this.physics.add.overlap(
      this.enemies.getChildren(),
      this.player,
      (...arr) => hit(arr, this)
    )

    this.physics.add.overlap(
      this.enemyBullets.getChildren(),
      this.player,
      (...arr) => hit(arr, this)
    )
  }

  update(time) {
    if (!this.initialTime) {
      this.initialTime = this.time.now
    }
    this.gameBgMove()
    move(this.player, this.keys)
    this.ListenPlayerFire(time)

    this.enemyFactory.generate(time)
    this.enemyCommander.fire(time)
  }

  ListenPlayerFire(time) {
    if (!this.player) return
    const { keySpace } = this.keys
    if (!keySpace.isDown) return

    // time gap
    if (time - this.playerBullets.lastFiredTime < this.player.bulletGapTime)
      return
    this.playerBullets.lastFiredTime = time

    const bullet = this.playerBullets
      .get(0, 0, this.player.bullet)
      .setActive(true)
      .setVisible(true)
      .setSpeed(this.player.bulletSpeed)

    if (bullet) {
      this.sound.play('fire')
      bullet.fire(this.player, null)
    }
  }

  gameBgMove() {
    this.bg.tilePositionX += GAME_BG_SPEED
  }
}
