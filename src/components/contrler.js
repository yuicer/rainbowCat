import { Input } from 'phaser'

export default class Contrler {
  constructor(scene) {
    const keyW = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W)
    const keyA = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A)
    const keyS = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S)
    const keyD = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D)
    const keySpace = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)

    return {
      keyW,
      keyA,
      keyS,
      keyD,
      keySpace
    }
  }
}
