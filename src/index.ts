import { ApolloServer, PubSub } from 'apollo-server'

import schema from '@src/graphql/schema'

export const pubsub = new PubSub()
const connectUsers = new Map()
const server = new ApolloServer({
  schema,
  context: pubsub,
  subscriptions: {
    onConnect: (param, ws) => {
      
    },
    onDisconnect: (socket) => {

    }
  }
})

server.listen()
  .then((serverInfo) => {
    const { url } = serverInfo
    console.log(`Server ready at ${url}`)
  })

