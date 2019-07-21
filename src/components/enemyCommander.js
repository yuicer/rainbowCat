export default class EnemyCommander {
  constructor(scene) {
    this.enemyBullets = scene.enemyBullets
    this.enemies = scene.enemies
    this.player = scene.player
  }

  fire(time) {
    const enemy = this.enemies.getChildren()
    const smallEnemy = enemy.filter(item => item.isSmall)
    const middleEnemy = enemy.filter(item => item.isMiddle)
    const bossEnemy = enemy.find(item => item.isBoss)

    middleEnemy.length && this.fixedFire(middleEnemy, time)
    smallEnemy.length && this.singleFire(smallEnemy, time)
    bossEnemy && this.continuousFire(bossEnemy, time)
    bossEnemy && this.scatteringFire(bossEnemy, time)
  }

  // boss 的霰弹
  scatteringFire(shooter, time) {
    if (!shooter.lastFiredTime1) shooter.lastFiredTime1 = time
    if (
      shooter.noFire1 &&
      time - shooter.lastFiredTime1 > shooter.flameoutTime1
    ) {
      shooter.fireNum1 = 0
      shooter.noFire1 = false
    }
    if (shooter.noFire1) return

    if (time - shooter.lastFiredTime1 > shooter.bulletGapTime1) {
      shooter.lastFiredTime1 = time
      shooter.fireNum1 = (shooter.fireNum1 || 0) + 1
      if (shooter.fireNum1 >= shooter.fireMaxTimes1) shooter.noFire1 = true

      for (
        let angle = -shooter.angle;
        angle <= shooter.angle;
        angle += shooter.angleGap
      ) {
        this.getBullet(shooter, shooter.bullet1)
          .fire(shooter, null)
          .setAngle(angle)
          .setSpeed(shooter.bulletSpeed1)
      }
    }
  }

  // n 发点射
  fixedFire(shooters, time) {
    shooters.forEach(item => {
      if (item.noFire) return
      if (!item.lastFiredTime) item.lastFiredTime = time

      if (time - item.lastFiredTime > item.bulletGapTime) {
        item.lastFiredTime = time
        item.fireNum = (item.fireNum || 0) + 1
        if (item.fireNum >= item.fireMaxTimes) item.noFire = true

        this.getBullet(item).fire(item, this.player)
      }
    })
  }

  // 间断连射
  continuousFire(shooter, time) {
    if (!shooter.lastFiredTime) shooter.lastFiredTime = time
    if (shooter.noFire && time - shooter.lastFiredTime > shooter.flameoutTime) {
      shooter.fireNum = 0
      shooter.noFire = false
    }
    if (shooter.noFire) return

    if (time - shooter.lastFiredTime > shooter.bulletGapTime) {
      shooter.lastFiredTime = time
      shooter.fireNum = (shooter.fireNum || 0) + 1
      if (shooter.fireNum >= shooter.fireMaxTimes) shooter.noFire = true

      this.getBullet(shooter).fire(shooter, this.player)
    }
  }

  singleFire(shooters) {
    shooters.forEach(item => {
      if (item.noFire) return

      item.fireNum = (item.fireNum || 0) + 1
      if (item.fireNum >= item.fireMaxTimes) item.noFire = true

      this.getBullet(item).fire(item, this.player)
    })
  }

  getBullet(owner, bullet) {
    return this.enemyBullets
      .get(0, 0, bullet || owner.bullet)
      .setActive(true)
      .setVisible(true)
      .setCircle(8, 0, 0)
      .setSpeed(owner.bulletSpeed)
  }
}
