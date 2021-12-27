const Player = require("./player")

class Game {
    constructor(gameWidth, gameHeight) {
        this.width = gameWidth
        this.height = gameHeight
        this.players = []
        this.objects = [this.players]
    }
    evalMouse(x, y, pressed) {
        this.players.forEach(player => {
            player.mousePressed = pressed
            player.mouseX = x
            player.mouseY = y
        })
    }
    createPlayer(id) {
        if (this.players.length === 2) return
        this.players.push(new Player(this.width, this.height, id))
    }
    update() {
        this.objects.forEach(object => {
            if (Array.isArray(object)) {
                object.forEach(obj => obj.update())
            } else {
                object.update()
            }
        })
    }
}

module.exports = Game