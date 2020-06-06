import { createGame } from '@src/games'
import shorid from 'shortid'
type args = {
  userName: string
}

export default {
  Mutation: {
    createGame: async (_: any, args: args, pubsub: any) => {
      const { userName } = args
      const code = shorid.generate()
      createGame(userName, code)
      return code
    },
  },
}
