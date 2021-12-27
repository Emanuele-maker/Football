class Timer {
    constructor(gameWidth, gameHeight, scale) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.updateDate()
        this.lastSeconds = this.currentSeconds
        this.size = 30 * scale

        this.hours = 0
        this.minutes = 0
        this.seconds = 0
    }
    updateDate() {
        this.date = new Date()
        this.currentSeconds = this.date.getSeconds()
    }
    update() {
        this.updateDate()

        if (this.seconds === 60) {
            this.seconds = 0
            this.minutes++
        }
        if (this.minutes === 60) {
            this.minutes = 0
            this.hours++
        }
        if (this.currentSeconds > this.lastSeconds) {
            this.seconds++
        }

        this.lastSeconds = this.currentSeconds
    }
}

module.exports = Timer