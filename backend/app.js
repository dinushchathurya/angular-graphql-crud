const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema =  require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql:true,
    })
)

const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});