import { Scene } from 'phaser'

import card from '@/assets/sprites/card.png'
import nyan_cat_bg from '@/assets/sprites/nyan_cat_bg.png'
import loading_cat from '@/assets/sprites/loading_cat.png'
import cat from '@/assets/sprites/nyan_cat.png'
import enemy_small from '@/assets/sprites/enemy_small.png'
import enemy_middle from '@/assets/sprites/enemy_middle.png'
import enemy_boss from '@/assets/sprites/enemy_boss.png'
import enemy_bullet from '@/assets/sprites/enemy_bullet.png'
import boss_bullet from '@/assets/sprites/boss_bullet.png'
import nyan from '@/assets/sprites/nyan.png'

import plane_boom_1 from '@/assets/sprites/plane_boom_1.png'
import plane_boom_2 from '@/assets/sprites/plane_boom_2.png'

import bgm from '@/assets/sounds/bgm.mp3'

import player_boom from '@/assets/sounds/player_boom.mp3'
import boss_boom from '@/assets/sounds/boss_boom.mp3'
import enemy_boom from '@/assets/sounds/enemy_boom.mp3'

import fire from '@/assets/sounds/fire.mp3'
import game_over from '@/assets/sounds/game_over.mp3'
import game_win from '@/assets/sounds/game_win.mp3'

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'start' })
  }
  //加载游戏资源
  preload() {
    const { width, height } = this.sys.canvas

    let progressText = this.add
      .text(width / 2, (height / 5) * 4, '0%')
      .setOrigin(0.5)
      .setFontSize(42)
      .setColor('#fff')
      .setDepth(1)

    this.load.on('progress', a => {
      progressText.setText(Math.floor(a * 100) + '%')
    })

    // all assets must be in callback = =
    this.load
      .spritesheet('loading_cat', loading_cat, {
        frameWidth: 150,
        frameHeight: 150
      })
      .on('filecomplete-spritesheet-loading_cat', () => {
        var animConfig = {
          key: 'loading',
          frames: 'loading_cat',
          duration: 2600,
          repeat: -1
        }
        this.anims.create(animConfig)
        this.add
          .sprite(width / 2, (height / 5) * 2, 'loading_cat')
          .play('loading')
      })
    this.load.image('game_bg', nyan_cat_bg)
    this.load.image('card', card)

    this.load.image('enemy_small', enemy_small)
    this.load.image('enemy_middle', enemy_middle)

    this.load.image('cat', cat)

    this.load.image('enemy_boss', enemy_boss)

    this.load.image('enemy_bullet', enemy_bullet)
    this.load.image('boss_bullet', boss_bullet)

    this.load.image('nyan', nyan)

    this.load.spritesheet('plane_boom_1', plane_boom_1, {
      frameWidth: 272,
      frameHeight: 236
    })
    this.load.spritesheet('plane_boom_2', plane_boom_2, {
      frameWidth: 312,
      frameHeight: 281
    })

    this.load.audio('bgm', bgm)
    this.load.audio('enemy_boom', enemy_boom)
    this.load.audio('boss_boom', boss_boom)
    this.load.audio('player_boom', player_boom)
    this.load.audio('fire', fire)
    this.load.audio('game_over', game_over)
    this.load.audio('game_win', game_win)
  }

  create() {
    this.gameStart()
  }
  gameStart() {
    this.scene.start('round1')
  }
}
