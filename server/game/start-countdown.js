class StartCountDown {
    constructor() {
        this.size = 50
        this.date = new Date()
        this.currentSeconds = this.date.getSeconds()
        this.seconds = 0
        this.maxSeconds = 3
        this.lastSeconds = this.currentSeconds
        this.paused = true
    }
    reset() {
        this.seconds = 0
    }
    resume() {
        this.paused = false
    }
    updateDate() {
        this.date = new Date()
        this.currentSeconds = this.date.getSeconds()
    }
    update() {
        if (this.paused) return
        this.updateDate()
        if (this.currentSeconds > this.lastSeconds) {
            this.seconds++
        }
        this.lastSeconds = this.currentSeconds
    }
}

module.exports = StartCountDown