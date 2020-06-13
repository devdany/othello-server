import { findRoom, getPlayerPosition, isTurn, putUnit } from '@src/games'

import { pubsub } from '@src/index'

type args = {
  code: string
  x: number
  y: number
  userName: string
}

export default {
  Mutation: {
    putUnit: async (_: any, args: args) => {
      const { code, x, y, userName } = args
      const room = findRoom(code)
      const userPosition = getPlayerPosition(userName, room)
      if (isTurn(room, userPosition)) {
        const changedRoom = putUnit(x, y, userPosition, room)
        if (changedRoom) {
          pubsub.publish('CHANGE_ROOM', changedRoom)
          return changedRoom
        } else {
          const updatedRoom = findRoom(code)
          if (!updatedRoom.isGaming && updatedRoom.winner > 0) {
            pubsub.publish('CHANGE_ROOM', updatedRoom)
            return updatedRoom
          } else {
            throw Error('Invalid action!')
          }
        }
      } else {
        throw Error('Not your turn!')
      }
    },
  },
}
