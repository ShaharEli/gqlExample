import { gql } from 'apollo-server-express'

export default gql`
  type Task {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Query {
    tasks: [Task]

    task(id: Int!): Task
  }

  type Mutation {
    addTask(task: String!): Task
  }
`
