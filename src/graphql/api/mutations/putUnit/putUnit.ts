import { findRoom } from '@src/games'
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
      console.log(room)
      pubsub.publish('PUT_UNIT', room)
      return room
    },
  },
}
