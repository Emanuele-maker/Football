const io = require("socket.io")({
    cors: {
        origin: "http://localhost:5500"
    }
})

const Game = require("./game/game")

let game = null, gameInitted = false

io.on("connection", socket => {
    const uid = socket.id
    const playerId = io.sockets.sockets.size
    let mousePressed = false
    socket.emit("playerId", playerId)
    console.log(`A client has connected! UID: ${uid}`)

    if (io.sockets.sockets.size < 2) gameInitted = false

    socket.on("initGame", (w, h) => {
        if (!gameInitted) {
            game = new Game(w, h)
            gameInitted = true
            startGameInterval()
        }
        game.createPlayer(playerId)
    })

    socket.on("mouseInfo", (pressed, x, y) => {
        if (!game) return
        game.evalMouse(x, y, pressed)
    })

    function startGameInterval() {
        const interval = setInterval(() => {
            game.update()
            io.emit("game", game)
        }, 10)
    }

    socket.on("disconnect", () => {
        console.log(`A client has disconnected.. UID: ${uid}`)
    })
})

const port = 3000 || process.env.PORT
io.listen(port, () => console.log(`Server started on port ${port}`))