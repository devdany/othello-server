type Room = {
  code: string
  p1: string
  p2?: string
  board: Location[][]
  isGaming: boolean
  winner: number
  turn: number
}

const rooms: Room[] = []

type Location = {
  x: number
  y: number
  unit: number
}

const initGameBoard = [
  [{x: 1, y: 8, unit: 0}, {x: 2, y: 8, unit: 0}, {x: 3, y: 8, unit: 0}, {x: 4, y: 8, unit: 0}, {x: 5, y: 8, unit: 0}, {x: 6, y: 8, unit: 0}, {x: 7, y: 8, unit: 0}, {x: 8, y: 8, unit: 0}],
  [{x: 1, y: 7, unit: 0}, {x: 2, y: 7, unit: 0}, {x: 3, y: 7, unit: 0}, {x: 4, y: 7, unit: 0}, {x: 5, y: 7, unit: 0}, {x: 6, y: 7, unit: 0}, {x: 7, y: 7, unit: 0}, {x: 8, y: 7, unit: 0}],
  [{x: 1, y: 6, unit: 0}, {x: 2, y: 6, unit: 0}, {x: 3, y: 6, unit: 0}, {x: 4, y: 6, unit: 0}, {x: 5, y: 6, unit: 0}, {x: 6, y: 6, unit: 0}, {x: 7, y: 6, unit: 0}, {x: 8, y: 6, unit: 0}],
  [{x: 1, y: 5, unit: 0}, {x: 2, y: 5, unit: 0}, {x: 3, y: 5, unit: 0}, {x: 4, y: 5, unit: 1}, {x: 5, y: 5, unit: 2}, {x: 6, y: 5, unit: 0}, {x: 7, y: 5, unit: 0}, {x: 8, y: 5, unit: 0}],
  [{x: 1, y: 4, unit: 0}, {x: 2, y: 4, unit: 0}, {x: 3, y: 4, unit: 0}, {x: 4, y: 4, unit: 2}, {x: 5, y: 4, unit: 1}, {x: 6, y: 4, unit: 0}, {x: 7, y: 4, unit: 0}, {x: 8, y: 4, unit: 0}],
  [{x: 1, y: 3, unit: 0}, {x: 2, y: 3, unit: 0}, {x: 3, y: 3, unit: 0}, {x: 4, y: 3, unit: 0}, {x: 5, y: 3, unit: 0}, {x: 6, y: 3, unit: 0}, {x: 7, y: 3, unit: 0}, {x: 8, y: 3, unit: 0}],
  [{x: 1, y: 2, unit: 0}, {x: 2, y: 2, unit: 0}, {x: 3, y: 2, unit: 0}, {x: 4, y: 2, unit: 0}, {x: 5, y: 2, unit: 0}, {x: 6, y: 2, unit: 0}, {x: 7, y: 2, unit: 0}, {x: 8, y: 2, unit: 0}],
  [{x: 1, y: 1, unit: 0}, {x: 2, y: 1, unit: 0}, {x: 3, y: 1, unit: 0}, {x: 4, y: 1, unit: 0}, {x: 5, y: 1, unit: 0}, {x: 6, y: 1, unit: 0}, {x: 7, y: 1, unit: 0}, {x: 8, y: 1, unit: 0}],
]

export const createGame = (p1: string, code: string) => {
  rooms.push({
    code: code,
    p1: p1,
    board: initGameBoard,
    isGaming: false,
    winner: 0,
    turn: 0,
  })
}

export const findRoom = (code: string) => {
  return rooms.find((room) => room.code === code)
}
