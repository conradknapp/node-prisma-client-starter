# Getting Started with Prisma Client

1. `prisma init` creates prisma.yml, datamodel.prisma, generated folder
2. Put prisma.yml and datamodel.prisma files in 'prisma' folder, put generated in 'src' folder
3. Change the output path of 'generate' in prisma.yml to '../src/generated/prisma-client/'
4. Init package.json
5. Install graphql, graphql-yoga, prisma-binding, prisma-client-lib deps
6. Init git repo, add .gitignore
7. Update datamodel.prisma with the types you want to have (i.e. type User, type Post), then deploy it with `prisma deploy`
8. Prisma client is based on your datamodel, it needs to be regenerated every time the datamodel is updated, so we'll add a post-deploy hook to our datamodel.prisma to automatically execute `prisma generate`:

```
hooks:
  post-deploy:
    - prisma generate
```

9. Create a schema file (schema.graphql in the src folder) with all of your Queries and Mutations. To this file, we can just copy and paste in our types that we created in datamodel.prisma with all of the directives removed
10. Then we'll create a resolvers file in our src folder, with all of the functions that will interact with our database, which will be immediately exported
11. Then we'll create our index.js file for our server in src

```
const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { resolvers } = require("./resolvers");

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on localhost:4000"));
```

12. Now we can write our start script as `node src/index.js` and run it!
13. Finally, install dotenv, put your environment variables in a .env file and put your prisma endpoint in there. Then link to it in your prisma.yml file like so:

```
endpoint: ${process.env.PRISMA_ENDPOINT}
```

And also add .env to your .gitignore file

Main resources:

- https://www.prisma.io/docs/get-started/03-build-graphql-servers-with-prisma-e001/
- https://github.com/prisma/prisma-examples/tree/master/node-graphql-schema-delegation
