// 游戏背景
export const GAME_BG = 'game_bg'

// 背景移动速度
export const GAME_BG_SPEED = 6

// 玩家移动速度
export const USER_SPEED = 5

// 子弹速度
export const BULLET_DEFAULT_SPEED = 500

export const PLAYER_CONFIG = {
  extra: {
    hp: 1,
    bullet: 'nyan',
    bulletSpeed: 450,
    bulletGapTime: 500,
    isPlayer: true
  },
  height: 50,
  width: 50,
  pic: 'cat'
}
// 敌人飞机设置
export const ENEMY_CONFIG = {
  smallEnemy: {
    extra: {
      hp: 1,
      score: 407,
      isSmall: true,
      fireMaxTimes: 1,
      bullet: 'enemy_bullet',
      bulletSpeed: 900
    },
    // 出现间隔时间
    generateGapTime: 3000,
    speed: 700,
    // 飞机群出现几率
    appearRate: 0.7,
    // 飞机群数目
    groupNum: 3,
    type: 'smallEnemy',
    pic: 'enemy_small',
    height: 90,
    width: 90
  },
  middleEnemy: {
    extra: {
      hp: 4,
      score: 1007,
      isMiddle: true,
      bulletGapTime: 300,
      fireMaxTimes: 4,
      bullet: 'enemy_bullet',
      bulletSpeed: 300
    },
    generateGapTime: 8000,
    speed: 150,
    height: 120,
    width: 120,
    pic: 'enemy_middle',
    type: 'middleEnemy'
  },
  bossEnemy: {
    extra: {
      showTime: 1000 * 60 * 1,
      hp: 40,
      score: 30007,
      isBoss: true,

      // 第一种攻击方式 点射追击
      bullet: 'boss_bullet',
      bulletGapTime: 800,
      fireMaxTimes: 6,
      bulletSpeed: 500,
      flameoutTime: 3000,

      // 第二种攻击方式 霰弹攻击
      bullet1: 'enemy_bullet',
      bulletGapTime1: 1000,
      fireMaxTimes1: 3,
      bulletSpeed1: 300,
      flameoutTime1: 8000,
      angle: Math.PI / 4,
      angleGap: Math.PI / 28
    },
    speed: 80,
    height: 280,
    width: 250,
    pic: 'enemy_boss',
    type: 'bossEnemy'
  }
}
