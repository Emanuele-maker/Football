class Player {
    constructor(gameWidth, gameHeight, id) {
        this.radius = 40
        this.id = id
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.position = {
            x: this.id === 1 ? this.radius * 3 : this.gameWidth - this.radius * 3,
            y: this.gameHeight / 2 - this.radius / 2
        }
        this.color = "red"
        this.mouseHeldOn = false
        this.mouseX = null
        this.mouseY = null
        this.mousePressed = false
        this.speed = {
            x: 3,
            y: 0
        }
        this.hitbox = {
            position: {
                x: this.position.x - ((this.radius / 2) * 2),
                y:  this.position.y - ((this.radius / 2) * 2),
            },
            scale: {
                width: this.radius * 2,
                height: this.radius * 2
            }
        }
    }
    mouseOn(x, y) {
        if (x >= this.hitbox.position.x && x <= this.hitbox.position.x + this.hitbox.scale.width && y >= this.hitbox.position.y && y <= this.hitbox.position.y + this.hitbox.scale.height) {
            return true
        }
        return false
    }
    setPositionOnMouse(mouseX, mouseY) {
        this.position = {
            x: mouseX,
            y: mouseY
        }
    }
    update() {
        if (this.mouseX !== null && this.mouseY !== null) {
            if (this.mousePressed && this.mouseHeldOn) {
                this.setPositionOnMouse(this.mouseX, this.mouseY)
            }
            if (this.mouseOn(this.mouseX, this.mouseY)) {
                this.mouseHeldOn = true
            }
            if (!this.mousePressed && !this.mouseOn(this.mouseX, this.mouseY)) {
                this.mouseHeldOn = false
            }
        }

        this.hitbox = {
            position: {
                x: this.position.x - ((this.radius / 2) * 2),
                y:  this.position.y - ((this.radius / 2) * 2),
            },
            scale: {
                width: this.radius * 2,
                height: this.radius * 2
            }
        }

        if (this.position.x < 0) this.position.x = 0
        if (this.position.x + this.radius >= this.gameWidth) this.position.x = this.gameWidth - this.radius
        if (this.position.y < 0) this.position.y = 0
        if (this.position.y + this.radius >= this.gameHeight) this.position.y = this.gameHeight - this.radius
    }
}

module.exports = Player