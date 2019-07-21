import Phaser from 'phaser'
import start from './scenes/start'
import round1 from './scenes/round1'

export default function gameStart() {
  new Phaser.Game({
    title: 'rainow cat',
    url: '',
    version: '1.0.0',
    type: Phaser.AUTO,
    width: window.innerWidth > 1440 ? 1440 : window.innerWidth,
    height: window.innerHeight > 800 ? 800 : window.innerHeight,
    parent: 'app',
    autoCenter: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [start, round1]
  })
}
