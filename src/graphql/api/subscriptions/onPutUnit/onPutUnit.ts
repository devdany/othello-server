import { pubsub } from '@src/index'
const { withFilter } = require('apollo-server')
export default {
  Subscription: {
    onPutUnit: {
      subscribe: withFilter(
       () => pubsub.asyncIterator(['PUT_UNIT']),
       (payload: any, variables: any) => {
         return payload.code === variables.code
       }
      ) 
    }
  },
}
