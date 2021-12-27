const io = require("socket.io")({
    cors: {
        origin: "https://awesome-yonath-58cc50.netlify.app"
    }
})

const Game = require("./game/game")

let game = null, gameInitted = false

io.on("connection", socket => {
    const uid = socket.id
    const playerId = io.sockets.sockets.size
    socket.emit("playerId", playerId)
    console.log(`A client has connected! UID: ${uid}`)

    if (playerId < 2) gameInitted = false
    if (playerId > 2) return socket.emit("tooManyPlayers")

    socket.on("initGame", (w, h) => {
        if (!gameInitted) {
            game = new Game(w, h)
            gameInitted = true
            startGameInterval()
        }
        game.createPlayer(playerId)
        if (playerId === 2) game.startMatch()
    })

    socket.on("mouseInfo", (pressed, x, y, speedX, speedY, playerId) => {
        if (!game) return
        game.evalMouseInfo(x, y, speedX, speedY, pressed, playerId)
    })

    function startGameInterval() {
        const interval = setInterval(() => {
            game.update()
            io.emit("game", game)
        }, 10)
    }

    socket.on("disconnect", () => {
        if (game) {
            game.deletePlayer(playerId)
        }
        console.log(`A client has disconnected.. UID: ${uid}`)
    })
})

const port = 3000 || process.env.PORT
io.listen(port, () => console.log(`Server started on port ${port}`))