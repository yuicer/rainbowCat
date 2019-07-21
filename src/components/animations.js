export default class Animations {
  constructor(scene) {
    scene.anims.create({
      key: 'boom1',
      frames: 'plane_boom_1',
      duration: 200,
      hideOncomplete: true
    })
    scene.anims.create({
      key: 'boom2',
      frames: 'plane_boom_2',
      duration: 600,
      hideOncomplete: true
    })
  }
}
