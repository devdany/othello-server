import { findRoom } from '@src/games'

type args = {
  code: string
}

export default {
  Query: {
    getRoom: async (_: any, args: args, pubsub: any) => {
      const { code } = args
      const room = findRoom(code)
      return room
    },
  },
}
