import { pubsub } from '@src/index'
const { withFilter } = require('apollo-server')
export default {
  Subscription: {
    onChangeRoom: {
      subscribe: withFilter(
       () => pubsub.asyncIterator(['CHANGE_ROOM']),
       (payload: any, variables: any) => {
         return payload.code === variables.code
       }
      ) ,
      resolve: (root: any) => {
        return root
      }
    }
  },
}
