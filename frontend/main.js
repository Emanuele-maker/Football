import Input from "./input.js"

const socket = io("http://localhost:3000")
let game, playerId
socket.on("game", gameState => game = gameState)
socket.on("playerId", id => playerId = id)

/** @type {HTMLCanvasElement} */
const canvas = document.body.appendChild(document.createElement("canvas"))
const ctx = canvas.getContext("2d")
const input = new Input(canvas)


canvas.width = 1280
canvas.height = 720
socket.emit("initGame", canvas.width, canvas.height)

function updateInput() {
    socket.emit("mouseInfo", input.isMouseButtonPressed(0), input.mouseX, input.mouseY)
}

function renderTimer(timer) {
    ctx.fillStyle = "white"
    ctx.font = `${timer.size}px Comic Sans MS`
    ctx.textAlign = "center"
    ctx.fillText(`${timer.hours}:${timer.minutes}:${timer.seconds}`, canvas.width / 2, 50)
}

function renderCircle(object) {
    ctx.fillStyle = object.color
    ctx.beginPath()
    ctx.arc(object.position.x, object.position.y, object.radius, 0, Math.PI * 2, false)
    ctx.fill()
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (game) {
        updateInput()
        game.players.forEach(player => {
            renderCircle(player)
        })
    }

    requestAnimationFrame(render)
}
render()