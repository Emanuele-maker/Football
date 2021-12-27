import Input from "./input.js"

const socket = io("https://crazy-football.herokuapp.com")
let game, playerId
socket.on("game", gameState => game = gameState)
socket.on("playerId", id => playerId = id)
socket.on("tooManyPlayers", () => alert("too many players connected to the server!"))

/** @type {HTMLCanvasElement} */
const canvas = document.body.appendChild(document.createElement("canvas"))
const ctx = canvas.getContext("2d")
const input = new Input(canvas)

canvas.width = 1280
canvas.height = 720
socket.emit("initGame", canvas.width, canvas.height)

function updateInput() {
    socket.emit("mouseInfo", input.isMouseButtonPressed(0), input.mouseX, input.mouseY, input.mouseSpeedX, input.mouseSpeedY, playerId)
}

function renderTimer(timer) {
    const remainingSeconds = 60 - timer.seconds
    const remainingMinutes = timer.maxMinutes - timer.minutes

    ctx.fillStyle = timer.color
    ctx.font = `${timer.size}px Comic Sans MS`
    ctx.textAlign = "center"
    ctx.fillText(`${remainingMinutes}:${remainingSeconds}`, canvas.width / 2, 50)
}

function renderCircle(object) {
    ctx.fillStyle = object.color
    ctx.beginPath()
    ctx.arc(object.position.x, object.position.y, object.radius, 0, Math.PI * 2, false)
    ctx.fill()
}

function renderField(field) {
    ctx.lineWidth = field.lineWidth
    ctx.strokeStyle = "white"
    ctx.beginPath()
    ctx.moveTo(field.centerLine.startingPoint.x, field.centerLine.startingPoint.y)
    ctx.lineTo(field.centerLine.endingPoint.x, field.centerLine.endingPoint.y)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(field.centerCircle.position.x, field.centerCircle.position.y, field.centerCircleRadius, 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.rect(field.leftGoal.position.x, field.leftGoal.position.y, field.leftGoal.scale.width, field.leftGoal.scale.height)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.rect(field.rightGoal.position.x, field.rightGoal.position.y, field.rightGoal.scale.width, field.rightGoal.scale.height)
    ctx.stroke()
    ctx.closePath()
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (game) {
        let countdownTimeLeft = game.countDown.maxSeconds - game.countDown.seconds
        updateInput()
        renderField(game.field)
        renderTimer(game.timer)
        game.players.forEach(player => {
            renderCircle(player)
            ctx.beginPath()
            ctx.fillStyle = "blue"
            ctx.stroke()
        })
        renderCircle(game.ball)
        ctx.fillStyle = "orange"
        ctx.fillText(game.score1, canvas.width / 4, 50)
        ctx.fillText(game.score2, canvas.width - canvas.width / 4, 50)
        if (game.state === "waiting") {
            ctx.fillText("Aspettando un altro giocatore...", canvas.width / 2, canvas.height / 2 - 30 / 2)
        } else if (game.state === "countdown") {
            ctx.font = "50px Comic Sans MS"
            ctx.fillText(countdownTimeLeft, canvas.width / 2, canvas.height / 2 - 50 / 2)
        } else if (game.state === "end") {
            ctx.font = "50px Comic Sans MS"
            ctx.fillText(`player ${game.winner} ha vinto!`, canvas.width / 2, canvas.height / 2 - 50 / 2)
        }
    }

    requestAnimationFrame(render)
}
render()