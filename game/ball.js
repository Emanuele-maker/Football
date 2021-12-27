class Ball {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.radius = 18
        this.position = {
            x: this.gameWidth / 2 - this.radius / 2,
            y: this.gameHeight / 2 - this.radius / 2
        }
        this.speed = {
            x: 0,
            y: 0
        }
    }
    update() {
        
    }
}