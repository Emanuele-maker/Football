const Player = require("./player")
const Ball = require("./ball")
const Field = require("./field")
const { circleIntersect, applyVectorSpeed, checkIfGoalIsScored } = require("./collision")
const Timer = require("./time")
const StartCountDown = require("./start-countdown")
class Game {
    constructor(gameWidth, gameHeight) {
        this.width = gameWidth
        this.height = gameHeight
        this.players = []
        this.field = new Field(this.width, this.height)
        this.ball = new Ball(this.width, this.height)
        this.timer = new Timer(this.width, this.height, 1)
        this.state = "waiting"
        this.score1 = 0
        this.score2 = 0
        this.countDown = new StartCountDown()
        this.countDownEnded = this.countDown.maxSeconds === this.countDown.seconds
        this.started = false
        this.objects = [this.ball, this.players, this.timer, this.countDown]
    }
    evalMouseInfo(x, y, speedX, speedY, pressed, playerId) {
        const player = this.players.find(pr => pr.id === playerId)
        if (!player) return
        player.mousePressed = pressed
        player.mouseX = x
        player.mouseY = y
        player.speed = {
            x: speedX,
            y: speedY
        }
    }
    createPlayer(id) {
        if (this.players.length === 2) return
        this.players.push(new Player(this.width, this.height, id))
    }
    deletePlayer(playerId) {
        const playerIndex = this.players.findIndex(pr => pr.id === playerId)
        if (playerIndex === -1) return
        this.players.splice(playerIndex, 1)
    }
    startMatch() {
        this.state = "playing"
    }
    startCountDown() {
        this.state = "countdown"
    }
    resetAfterGoalScored() {
        this.players.forEach(player => {
            player.position = {
                x: player.id === 1 ? player.radius * 3 : this.width - player.radius * 3,
                y: this.height / 2 - player.radius / 2
            }
        })
        this.ball.position = {
            x: this.width / 2 - this.ball.radius / 2,
            y: this.height / 2 - this.ball.radius / 2
        }
        this.timer.active = false
    }
    reset() {
        this.resetAfterGoalScored()
        this.timer.reset()
        this.countDown.seconds = 0
        this.ball.speed = {
            x: 0,
            y: 0
        }
        this.score1 = 0
        this.score2 = 0
        this.winner = null
    }
    update() {
        if (this.players.length === 0) {
            this.reset()
            this.state = "waiting"
            this.started = false
        }
        if (this.state === "playing") {
            this.objects.forEach(object => {
                if (Array.isArray(object)) {
                    object.forEach(obj => obj.update())
                } else {
                    object.update()
                }
            })

            this.players.forEach(player => {
                if (circleIntersect(player.position.x, player.position.y, player.radius, this.ball.position.x, this.ball.position.y, this.ball.radius)) {
                    applyVectorSpeed(player, this.ball)
                }
            })

            if (checkIfGoalIsScored(this.ball, this.field.leftGoal, "left")) {
                this.score2++
                this.resetAfterGoalScored()
                this.started = false
                this.countDown.reset()
                this.startCountDown()
            }
            if (checkIfGoalIsScored(this.ball, this.field.rightGoal, "right")) {
                this.score1++
                this.resetAfterGoalScored()
                this.started = false
                this.countDown.reset()
                this.startCountDown()
            }

            if (this.timer.minutes === this.timer.maxMinutes && this.timer.seconds === 59) {
                this.state = "end"
                if (this.score1 > this.score2) {
                    this.winner = 1
                } else if (this.score2 > this.score1) {
                    this.winner = 2
                } else {
                    this.winner = 0
                }
            }

        } else if (this.state === "countdown") {
            this.countDown.resume()
            this.countDown.update()
            if (this.countDown.seconds === this.countDown.maxSeconds) {
                this.started = true
                this.timer.active = true
                this.startMatch()
            }
        }
        if (this.players.length === 1) {
            this.state = "waiting"
        } else if (this.players.length === 2 && !this.started) {
            this.startCountDown()
        }
    }
}

module.exports = Game