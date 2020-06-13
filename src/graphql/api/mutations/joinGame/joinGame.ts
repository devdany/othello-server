import { joinGame } from '@src/games'
import { pubsub } from '@src/index'
type args = {
  userName: string
  code: string
}

export default {
  Mutation: {
    joinGame: async (_: any, args: args, pubsub: any) => {
      const { userName, code } = args
      const { result, room } = joinGame(code, userName)
      if (result) {
        pubsub.publish('CHANGE_ROOM', room)
      }
      return result
    },
  },
}
