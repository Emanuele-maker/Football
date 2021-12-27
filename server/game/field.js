const goalScale = {
    width: 70,
    height: 200
}

class Field {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.lineWidth = 6
        this.centerLine = {
            startingPoint: {
                x: this.gameWidth / 2 - this.lineWidth / 2,
                y: 0
            },
            endingPoint: {
                x: this.gameWidth / 2 - this.lineWidth / 2,
                y: this.gameHeight
            }
        }
        this.centerCircleRadius = 80
        this.centerCircle = {
            position: {
                x: this.gameWidth / 2 - this.centerCircleRadius / 2 + 35,
                y: this.gameHeight / 2 - this.centerCircleRadius / 2 + 35
            }
        }
        this.leftGoal = {
            position: {
                x: 0,
                y: this.gameHeight / 2 - goalScale.height / 2
            },
            scale: {
                width: goalScale.width,
                height: goalScale.height
            }
        }
        this.rightGoal = {
            position: {
                x: this.gameWidth - goalScale.width,
                y: this.gameHeight / 2 - goalScale.height / 2
            },
            scale: {
                width: goalScale.width,
                height: goalScale.height
            }
        }
    }
}

module.exports = Field