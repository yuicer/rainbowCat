import $store from '@/store'
import sumScore from '@/utils/sumScore'
import { resetStore } from '@/store'
import gameStart from '@/game'

export default function hit([objA, objB], scene) {
  if (objA.active === true && objB.active === true) {
    ;[objA, objB].forEach(obj => {
      if (obj.hp !== undefined) {
        obj.hp -= 1

        if (obj.hp === 0) {
          if (obj.isPlayer) {
            scene.bgm.stop()
            scene.sound.play('player_boom')
            scene.player = null
            $store.totalTime = scene.time.now - scene.initialTime

            obj
              .disableBody()
              .play('boom2')
              .on('animationcomplete', () => {
                obj.destroy()
                const game_over = scene.sound.add('game_over')
                game_over.on('complete', () => {
                  gameOver(scene)
                })
                game_over.play()
              })
          } else if (obj.isBoss) {
            scene.bgm.stop()
            scene.sound.play('boss_boom')
            $store.totalTime = scene.time.now - scene.initialTime
            $store.isWin = true

            obj
              .disableBody()
              .play('boom2')
              .on('animationcomplete', () => {
                $store.destroiedEnemies.push(obj)
                obj.destroy()

                const game_win = scene.sound.add('game_win')
                game_win.on('complete', () => {
                  gameOver(scene)
                })
                game_win.play()
              })
          } else if (obj.isMiddle) {
            scene.sound.play('enemy_boom')

            obj
              .disableBody()
              .play('boom2')
              .on('animationcomplete', () => {
                $store.destroiedEnemies.push(obj)
                obj.destroy()
              })
          } else {
            scene.sound.play('enemy_boom')

            obj
              .disableBody()
              .play('boom1')
              .on('animationcomplete', () => {
                $store.destroiedEnemies.push(obj)
                obj.destroy()
              })
          }
        }
      } else obj.destroy()
    })
  }
}

function gameOver(scene) {
  $store.score = sumScore()
  const { width, height } = scene.sys.canvas
  const box = scene.add
    .container(width / 2, (height / 5) * 2, [
      scene.add
        .image(0, 0, 'card')
        .setInteractive()
        .on('pointerdown', () => {
          resetStore()
          scene.game.destroy(true)
          gameStart()
        }),
      scene.add
        .text(0, -30, `your final score: ${$store.score.toFixed()}`)
        .setOrigin(0.5),
      scene.add.text(0, 10, `try it again!`).setOrigin(0.5)
    ])
    .setDepth(9)
  if ($store.isWin)
    box.add(
      scene.add
        .text(0, -60, 'Congratulations!')
        .setOrigin(0.5)
        .setFontSize(32)
    )
}
