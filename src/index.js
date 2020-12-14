
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const {schema} = require("./schema");
const {resolvers} = require("./resolvers/resolvers");


// const loggingMiddleware = (req, res, next) => {
//     next();
// }
// app.use(loggingMiddleware);

app.use(bodyParser.json());
app.use(cors());
app.use("/graphql", graphqlHTTP({
        schema: buildSchema(schema),
        rootValue: resolvers,
        graphiql: true //process.env.NODE_ENV === 'development'
    })
);

app.listen(3000, () => console.log("Server started on port 3000"));

//module.exports.handler = serverless(app);