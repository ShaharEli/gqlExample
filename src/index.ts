import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { getTypeDefs, fetchResolvers } from './graphql'
const app = express()

;(async () => {
  const resolvers = await fetchResolvers()
  const typeDefs = await getTypeDefs()
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const server = new ApolloServer({ schema })
  await server.start()
  server.applyMiddleware({ app })
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})()
