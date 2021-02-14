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
    type QuoteInputData {
        quote: String!
        author: String!
    }
    type RootQuery {
        quotes: QuoteData!
    }
    type RootMutation {
        createQuote(quoteInput: QuoteInputData): Quote!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);