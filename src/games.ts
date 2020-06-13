type Room = {
  code: string
  p1: string
  p2?: string
  board: Location[][]
  isGaming: boolean
  winner: number
  turn: number
  p1FailCount: number
  p2FailCount: number
}

const rooms: Room[] = []

type Location = {
  x: number
  y: number
  unit: number
}
// 1, 8 => 0, 0
// 2, 8 => 0, 1
// 3, 8 => 0, 2

// 1, 7 => 1, 0
// 1, 6 => 2, 0
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
    p1FailCount: 0,
    p2FailCount: 0,
  })
}

export const findRoom = (code: string) => {
  return rooms.find((room) => room.code === code)
}

export const joinGame = (code: string, userName: string) => {
  let isFind = false
  let updatedRoom
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i]
    if (room.code === code) {
      rooms[i].p2 = userName
      isFind = true
      updatedRoom = rooms[i]
      break
    }
  }
  return {
    result: isFind,
    room: updatedRoom
  }
}

export const startGame = (code: string) => {
  let startedRoom
  let isFind
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i]
    if (room.code === code) {
      rooms[i].isGaming = true
      rooms[i].turn = 1
      rooms[i].board = initGameBoard
      rooms[i].p1FailCount = 0
      rooms[i].p2FailCount = 0
      rooms[i].winner = 0
      isFind = true
      startedRoom = room
      break
    }
  }
  return {
    result: isFind,
    room: startedRoom
  }
}

export const getPlayerPosition = (userName: string, room: Room) => {
  return room.p1 === userName ? 1 : 2
}

export const isTurn = (room: Room, userPosition: number) => {
  return room.turn === userPosition
}

const addFailCount = (room: Room, userPosition: number) => {
  if (userPosition === 1) {
    room.p1FailCount += 1
  } else {
    room.p2FailCount += 1
  }
  isEndGame(room)
}

export const isEndGame = (room: Room) => {
  if (room.p1FailCount === 3) {
    room.isGaming = false
    room.winner = 2
  } else if (room.p2FailCount === 3) {
    room.isGaming = false
    room.winner = 1

  } else {
    let isFull = true
    let p1Score = 0
    let p2Score = 0
    for (let i = 0; i < 8; i ++) {
      for (let j = 0; j < 8; j ++) {
        const unit = room.board[i][j]
        if (unit.unit === 0) {
          isFull = false
          break
        } else if (unit.unit === 1) {
          p1Score ++
        } else {
          p2Score ++
        }
      }
    }
    if (isFull) {
      room.isGaming = false
      room.winner =  p1Score === p2Score ? 0 : p1Score > p2Score ? 1 : 2
    }
  }
}

export const putUnit = (x: number, y: number, userPosition: number, room: Room) => {
  const board = room.board
  const otherPosition = userPosition === 1 ? 2 : 1
  if (x > 8 || y > 8) {
    addFailCount(room, userPosition)
    return false
  }

  const { i, j } = translateXYtoIndex(x, y)
  // already there is unit
  if (board[i][j].unit !== 0) {
    addFailCount(room, userPosition)
    return false
  }

  // it can't put as rule: it sholud be get other unit.
  const getUnitList = getUnitTargetListFromPut(x, y, board, userPosition)
  if (getUnitList.length === 0) {
    addFailCount(room, userPosition)
    return false
  }

  // change board
  for (let i = 0; i < getUnitList.length; i++) {
    const changedUnit = getUnitList[i]
    const changedUnitsIndex = translateXYtoIndex(changedUnit.x, changedUnit.y)
    const unitOnBoard = board[changedUnitsIndex.i][changedUnitsIndex.j]
    if (unitOnBoard) {
      room.board[changedUnitsIndex.i][changedUnitsIndex.j].unit = userPosition
    }
  }
  room.board[i][j].unit = userPosition
  room.turn = otherPosition
  isEndGame(room)
  return room
}

const translateXYtoIndex = (x: number, y: number) => {
  return {
    i: 8 - y,
    j: x - 1,
  }
}

const isValidIndex = (spot: number) => {
  return 0 <= spot && spot <=7
}

const getUnitTargetListFromPut = (x: number, y: number, board: Location[][], userPosition: number) => {
  const { i, j } = translateXYtoIndex(x, y)
  let targetUnitList: Location[] = []
  const otherPosition = userPosition === 1 ? 2 : 1
  
  // check same y line
  // find to left
  let leftUnits: Location[] = []
  for (let index = j - 1; index >= 0; index --) { 
    if (isValidIndex(index)) {
      const unit = board[i][index]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(leftUnits)
          break
        } else if (unit.unit === otherPosition) {
          leftUnits.push(unit)
        } else {
          leftUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  // find to right
  let rightUnits: Location[] = []
  for (let index = j + 1; index < 8; index ++) {
    if (isValidIndex(index)) {
      const unit = board[i][index]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(rightUnits)
          break
        } else if (unit.unit === otherPosition) {
          rightUnits.push(unit)
        } else {
          rightUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  //check same x line
  // find to top
  let topUnits: Location[] = []
  for (let index = i - 1; index >= 0; index--) {
    if (isValidIndex(index)) {
      const unit = board[index][j]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(topUnits)
          break
        } else if (unit.unit === otherPosition) {
          topUnits.push(unit)
        } else {
          topUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  // find to bottom
  let bottomUnits: Location[] = []
  for (let index = i + 1; index < 8; index++) {
    if (isValidIndex(index)) {
      const unit = board[index][j]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(bottomUnits)
          break
        } else if (unit.unit === otherPosition) {
          bottomUnits.push(unit)
        } else {
          bottomUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  // check diagonal
  // left & right
  let leftTopUnits: Location[] = []
  for (let index = { leftIndex: j - 1, topIndex: i - 1}; index.leftIndex >= 0 || index.topIndex >= 0; { leftIndex: index.leftIndex--, topIndex: index.topIndex-- }) {
    if (isValidIndex(index.leftIndex) && isValidIndex(index.topIndex)) {
      const unit = board[index.topIndex][index.leftIndex]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(leftTopUnits)
          break
        } else if (unit.unit === otherPosition) {
          leftTopUnits.push(unit)
        } else {
          leftTopUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }
  
  let rightTopUnits: Location[] = []
  for (let index = { rightIndex: j + 1, topIndex: i - 1 }; index.rightIndex < 8 || index.topIndex >= 0; { rightIndex: index.rightIndex++, topIndex: index.topIndex-- }) {
    if (isValidIndex(index.rightIndex) && isValidIndex(index.topIndex)) {
      const unit = board[index.topIndex][index.rightIndex]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(rightTopUnits)
          break
        } else if (unit.unit === otherPosition) {
          rightTopUnits.push(unit)
        } else {
          rightTopUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  let leftBottomUnits: Location[] = []
  for (let index = { leftIndex: j - 1, bottomIndex: i + 1}; index.leftIndex >= 0 || index.bottomIndex < 8; { leftIndex: index.leftIndex--, bottomIndex: index.bottomIndex++ }) {
    if (isValidIndex(index.leftIndex) && isValidIndex(index.bottomIndex)) {
      const unit = board[index.bottomIndex][index.leftIndex]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(leftBottomUnits)
          break
        } else if (unit.unit === otherPosition) {
          leftBottomUnits.push(unit)
        } else {
          leftBottomUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  let rightBottomUnits: Location[] = []
  for (let index = { rightIndex: j + 1, bottomIndex: i + 1 }; index.rightIndex < 8 || index.bottomIndex < 8; { rightIndex: index.rightIndex++, bottomIndex: index.bottomIndex++ }) {
    if (isValidIndex(index.rightIndex) && isValidIndex(index.bottomIndex)) {
      const unit = board[index.bottomIndex][index.rightIndex]
      if (unit) {
        if (unit.unit === userPosition) {
          targetUnitList = targetUnitList.concat(rightBottomUnits)
          break
        } else if (unit.unit === otherPosition) {
          rightBottomUnits.push(unit)
        } else {
          rightBottomUnits = []
          break
        }
      } else {
        break
      }
    } else {
      break
    }
  }

  return targetUnitList
}

