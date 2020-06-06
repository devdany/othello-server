import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'

import { makeExecutableSchema } from 'graphql-tools/dist/index'
import path from 'path'

const allTypes = fileLoader(path.join(__dirname, '/api/**/**/*.graphql'))
const allResolvers = fileLoader(path.join(__dirname, '/api/**/**/*.ts'))

export default makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
})
