const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Quote {
        _id: ID!
        quote: String!
        author: String!
    }
    type QuoteData {
        quotes: [Quote!]!
    }
    type RootQuery {
        quotes: QuoteData!
    }
    schema {
        query: RootQuery
    }
`);