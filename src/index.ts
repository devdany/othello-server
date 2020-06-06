import { ApolloServer, PubSub } from 'apollo-server'

import schema from '@src/graphql/schema'

export const pubsub = new PubSub()
const server = new ApolloServer({
  schema,
  context: pubsub,
  subscriptions: {
    onConnect: (param, ws) => {
      console.log('ws connect')
    }
  }
})

server.listen()
  .then((serverInfo) => {
    const { url } = serverInfo
    console.log(`Server ready at ${url}`)
  })

