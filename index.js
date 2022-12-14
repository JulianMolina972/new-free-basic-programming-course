const express = require('express')
const cors = require('cors')

const app = express()

http://DESKTOP-79P2JLR.local:8080

app.use(express.static('public'))
app.use(cors())
app.use(express.json())


const players = []

class Player {
  constructor(id) {
    this.id = id
  }

  getMokepon(mokepon) {
    this.mokepon = mokepon
  }

  positionUpdate(x, y) {
    this.x = x
    this.y = y
  }

  getAttacks(attacks) {
    this.attacks = attacks
  }
}

class Mokepon {
  constructor(name) {
    this.name = name
  }
}

app.get("/join", (req, res) => {
  const id = `${Math.random()}` 

  const player = new Player(id)

  players.push(player)

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.send(id)
})

app.post("/mokepon/:playerId", (req, res) => {
  const playerId = req.params.playerId || ''
  const name = req.body.mokepon || ''
  const mokepon = new Mokepon(name)
  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].getMokepon(mokepon)
  }

  console.log(players)
  console.log(playerId)
  res.end()
})

app.post("/mokepon/:playerId/position", (req, res) => {
  const playerId = req.params.playerId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].positionUpdate(x, y)
  }

  const enemies = players.filter((player) => playerId !== player.id)


  res.send({
    enemies
  })

})

app.post("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
  const attacks = req.body.attacks || 0

  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].getAttacks(attacks)
  }
  res.end()
})

app.get("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
  const player = players.find((player) => playerId === player.id)
  res.send({
    attacks: player.attacks || []
  })
})

app.listen(8080, () => {
  console.log('SERVER OK')
})