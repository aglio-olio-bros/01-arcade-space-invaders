// Střela trefila mimozemšťana
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (strela, mimozemstan) {
    strela.destroy()
    mimozemstan.destroy(effects.disintegrate, 100)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    strela = sprites.createProjectileFromSprite(img`
        2 
        2 
        2 
        2 
        `, hrac, 0, -140)
})
// Mimozemšťan trefil hráče
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (hrac, mimozemstan) {
    mimozemstan.destroy(effects.fire, 100)
    scene.cameraShake(4, 200)
    info.changeLifeBy(-1)
})
let mimozemstan: Sprite = null
let strela: Sprite = null
let hrac: Sprite = null
hrac = sprites.create(img`
    . . . . 8 8 . . . . 
    . . . 8 8 8 8 . . . 
    . . . 8 1 1 8 . . . 
    . . 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 . 
    8 8 . 8 8 8 8 . 8 8 
    . . . 8 . . 8 . . . 
    . . 8 8 . . 8 8 . . 
    `, SpriteKind.Player)
hrac.setPosition(80, 110)
hrac.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(hrac, 100, 0)
info.setScore(0)
info.setLife(5)
// Mimozemšťan doletěl dolů
game.onUpdate(function () {
    for (let mimozemstan2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (mimozemstan2.y > 115) {
            mimozemstan2.destroy()
            info.changeLifeBy(-1)
        }
    }
})
// Vytváření mimozemšťanů nahoře
game.onUpdateInterval(1500, function () {
    mimozemstan = sprites.create(img`
        . . 7 . . . . 7 . . 
        . . . 7 . . 7 . . . 
        . . 7 7 7 7 7 7 . . 
        . 7 7 1 7 7 1 7 7 . 
        7 7 7 7 7 7 7 7 7 7 
        7 . 7 7 7 7 7 7 . 7 
        7 . 7 . . . . 7 . 7 
        . . . 7 7 . 7 7 . . 
        `, SpriteKind.Enemy)
    mimozemstan.setPosition(randint(8, 152), 0)
    mimozemstan.vy = 35
})
