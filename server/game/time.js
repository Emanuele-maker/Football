class Timer {
    constructor(gameWidth, gameHeight, scale) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.updateDate()
        this.lastSeconds = this.currentSeconds
        this.size = 30 * scale

        this.minutes = 0
        this.seconds = 0
        this.maxMinutes = 2

        this.color = "orange"
        this.active = true
    }
    reset() {
        this.seconds = 0
        this.minutes = 0
    }
    updateDate() {
        this.date = new Date()
        this.currentSeconds = this.date.getSeconds()
    }
    update() {
        if (!this.active) return
        this.updateDate()

        if (this.seconds === 60) {
            this.seconds = 0
            this.minutes++
        }
        if (this.currentSeconds > this.lastSeconds) {
            this.seconds++
        }

        this.lastSeconds = this.currentSeconds
    }
}

module.exports = Timer