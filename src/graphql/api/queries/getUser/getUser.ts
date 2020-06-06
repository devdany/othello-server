type args = {
  userId: String
}

export default {
  Query: {
    getUser: async (_: any, args: args, pubsub: any) => {
      const { userId } = args
      return {
        id: userId,
        name: 'dany2',
      }
    },
  },
}
