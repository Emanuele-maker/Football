const { detectCollisionsWithWalls } = require("./collision")
class Ball {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.radius = 18
        this.position = {
            x: this.gameWidth / 2 - this.radius / 2 + 5,
            y: this.gameHeight / 2 - this.radius / 2 + 10
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.friction = 0.98
        this.collidedAfterKickoff = false
        this.color = "yellow"
    }
    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        this.speed.x *= this.friction
        this.speed.y *= this.friction

        detectCollisionsWithWalls(this, this.gameWidth, this.gameHeight)
    }
}

module.exports = Ball