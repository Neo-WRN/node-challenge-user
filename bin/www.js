const app = require('../app')
const http = require('http')

const port = process.env.PORT || 3000
app.set("port", port)
const server = http.createServer(app)
server.listen(port)

server.on("error", onError)
server.on("listening", onListening)


function pipeOrPort(address) {
    return typeof address == "string" ? `pipe ${address}` : `port ${address}`
}

function onError(error) {
    if (error.syscall != "listen") {
        throw error
    }
    let bind = pipeOrPort(server.address)
    switch (error.code) {
        case "EACESS":
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    let bind = pipeOrPort(server.address())
    console.log(`Listening on ${bind}`)
}




