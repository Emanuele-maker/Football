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
    }
    mouseOn(x, y) {
        if (x >= this.position.x && x <= this.position.x + this.radius && y >= this.position.y && y <= this.position.y + this.radius) {
            return true
        }
        return false
    }
    setPositionOnMouse(mouseX, mouseY) {
        this.position = {
            x: mouseX - this.radius / 2,
            y: mouseY - this.radius / 2
        }
    }
    update() {
        if (this.mouseX !== null && this.mouseY !== null) {
            if (this.mousePressed && this.mouseHeldOn) {
                this.setPositionOnMouse(this.mouseX, this.mouseY)
            }
            if (this.mouseX >= this.position.x) {
                this.mouseHeldOn = true
            }
            if (!this.mousePressed && !this.mouseOn(this.mouseX, this.mouseY)) {
                this.mouseHeldOn = false
            }
        }
    }
}

module.exports = Player