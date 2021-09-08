import glob, { IGlob } from 'glob'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { promisfy } from '../utils'

const promisedGlob = promisfy<IGlob>(glob)

const formatPath = (s: string) => `./${s.split('/graphql/')[1]}`

const getMutations = async () => {
  const mutations = (await promisedGlob(
    'src/**/mutations/*{.ts,.js}'
  )) as string[]

  const mutationResolvers = await Promise.all(
    mutations.map((f) => import(formatPath(f)))
  )
  return {
    Mutation: mutationResolvers.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    ),
  }
}

const getQueries = async () => {
  const queries = (await promisedGlob('src/**/queries/*{.ts,.js}')) as string[]
  const queriesResolvers = await Promise.all(
    queries.map((f) => import(formatPath(f)))
  )
  return {
    Query: queriesResolvers.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  }
}

const importTypeDefs = async () => {
  const typeDefs = (await promisedGlob(
    'src/graphql/**/typeDefs{.ts,.js}'
  )) as string[]

  const allTypeDefs = (
    await Promise.all(typeDefs.map((f) => import(formatPath(f))))
  ).map((e) => e.default)
  return allTypeDefs
}

export const getTypeDefs = async () => mergeTypeDefs(await importTypeDefs())
export const fetchResolvers = async () => ({
  ...(await getQueries()),
  ...(await getMutations()),
})
