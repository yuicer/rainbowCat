import Phaser from 'phaser'

export default class gameOverBoard extends Phaser.GameObjects {
  constructor(scene) {
    super(scene)
    const { width, height } = scene.sys.canvas
    const tyyAgainDom = this.add
      .text(0, 30, `try it agian!`)
      .setInteractive()
      .on('pointerdown', () => {
        console.log('123', 123)
      })

    scene.container(width / 2, (height / 5) * 2, [
      scene.add.image(0, 0, 'card'),
      scene.add.text(0, 0, `your final score: 1111`).setOrigin(0.5),
      tyyAgainDom.setOrigin(0.5)
    ])
    scene.add.existing(this)
  }
}

// const { width, height } = this.sys.canvas
// const tyyAgainDom = this.add
//   .text(0, 30, `try it agian!`)
//   .setInteractive()
//   .on('pointerdown', () => {
//     console.log('123', 123)
//   })

// this.add.container(width / 2, (height / 5) * 2, [
//   this.add.image(0, 0, 'card'),
//   this.add.text(0, 0, `your final score: 1111`).setOrigin(0.5),
//   tyyAgainDom.setOrigin(0.5)
// ])
