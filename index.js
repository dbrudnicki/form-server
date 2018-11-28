const { GraphQLServer } = require('graphql-yoga')

let dataForm = {
  id: '1',
  fname: 'John',
  lname: 'Smith',
  age: 900
}

const typeDefs = `
  type Form {
    id: ID
    fname: String
    lname: String
    age: Int
  }

  input InputForm {
    id: ID
    fname: String
    lname: String
    age: Int
  }

  type Query {
    getForm: Form!
  }

  type Mutation {
    updateForm(form: InputForm!): Form!
  }
`

const resolvers = {
  Query: {
    getForm() {
      return dataForm
    }
  },
  Mutation: {
    updateForm: (node, { form }) => {
      dataForm = { ...dataForm, ...form }
      return dataForm
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log(`Server started at: ${new Date()}`))
