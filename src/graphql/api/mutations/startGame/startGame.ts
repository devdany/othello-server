import { pubsub } from '@src/index'
import { startGame } from '@src/games'
type args = {
  code: string
}

export default {
  Mutation: {
    startGame: async (_: any, args: args, pubsub: any) => {
      const { code } = args
      const { result, room } = startGame(code)
      if (result) {
        pubsub.publish('CHANGE_ROOM', room)
      }
      return result
    },
  },
}
