const { GraphQLServer } = require('graphql-yoga')

const PORT = process.env.PORT || 4000

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
    form: Form!
  }

  type Mutation {
    updateForm(form: InputForm!): Form!
  }
`

const resolvers = {
  Query: {
    form() {
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

server.start({ port: PORT }, () =>
  console.log(`Server started at: ${new Date()} on port: ${PORT}.`)
)
