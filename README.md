<div align="center">

# NRTGMP Template

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Shadcn](https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white)

![GitHub forks](https://img.shields.io/github/forks/iamabhi747/nrtgmp-template?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/iamabhi747/nrtgmp-template?style=for-the-badge)

</div>

This repository is a robust base template for building modern web applications using Next.js, React, TailwindCSS, GraphQL, MongoDB, Sequelize, and Shadcn components. It is designed with a modular structure to facilitate scalability and maintainability.

## Getting Started

First, install the `create-nrtgmp-app` package globally:

```bash
npm install -g create-nrtgmp-app
```

Then, create a new project using the package:

```bash
npx create-nrtgmp-app my-nrtgmp-app
```

Navigate to the project directory and run the development server:

```bash
cd my-nrtgmp-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- **Next.js**: A React framework for production.
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework.
- **GraphQL**: A query language for your API.
- **MongoDB**: A NoSQL database.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **Shadcn Components**: A set of UI components.

## GraphQL Setup

GraphQL is set up using Apollo Server and Apollo Client. The Apollo Client setup will change frequently, and documentation for it will be added later.

In development mode, there is an Apollo GraphQL playground available at `http://localhost:3000/graphql`.

### Adding GraphQL Queries and Resolvers

The project follows a modular structure for GraphQL. To add a new query or extend an existing query:

1. Create a folder in `/src/graphql`.
2. Add two files: `*.graphql` and `*.resolver.js`.


```graphql
# src/graphql/user/user.graphql
type User {
  id: Int!
  name: String!
}

type Query {
  users: [User!]
}
```

`*.graphql` files define the schema for the query. This example defines a `User` type with `id` and `name` fields, and a `users` query that returns a list of users.


```javascript
// src/graphql/user/user.resolver.js
const { users } = require("./user.js");

module.exports = { 
    Query: {
        users: async (parent, args) => {
            return users; 
        }
    }
}
```
`*.resolver.js` files export an object with the query resolvers.
This resolver provides the implementation for the `users` query, returning a list of users.

## API Routes

To add APIs, use the Next.js App Router:

1. Create a folder in `/src/app/api`.
2. Inside this folder, create a file named `route.js`.
3. Export async functions for supported methods that handle the request and response.


```javascript
// src/app/api/hello/route.js
export async function GET(request) {
    return new Response(JSON.stringify({ message: 'Hello, world!' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
```

This example creates an API route at `/api/hello` exposing a `GET` method that returns a JSON response with a message.

## Database Setup

This repository supports both MongoDB and PostgreSQL (via Sequelize) with a modular setup. Databases will be connected automatically at initialization if the necessary environment variables are provided.

### MongoDB

- Directory: `/src/mongodb`
- Datasources: `/src/mongodb/datasources.js`

### Sequelize (PostgreSQL)

- Directory: `/src/sequelize`
- Datasources: `/src/sequelize/datasources.js`

### Environment Variables

Ensure the following environment variables are set in your `.env` file:

- MongoDB: `MONGODB_URI`
- PostgreSQL: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`

### Accessing Datasources

#### In GraphQL Resolvers

Datasources can be accessed in GraphQL resolvers by using the `ds` object from `context`.

```javascript
// src/graphql/user/user.resolver.js
module.exports = { 
    Query: {
        users: async (parent, args, { ds }) => {
            return ds.UserDataSource.getUsers();
        }
    }
}
```

#### In API Routes

Datasources can be accessed by importing `@/mongodb/datasources.js` or `@/sequelize/datasources.js`.

```javascript
// src/app/api/user/route.js
import mongoDatasources as ds from '@/mongodb/datasources.js';
// or
// import sequelizeDatasources as ds from '@/sequelize/datasources.js';

export async function GET(request) {
    return new Response(JSON.stringify(await ds.UserDataSource.getUsers()), {
        headers: { 'Content-Type': 'application/json' },
    });
}
```

### Adding Datasources

#### MongoDB

1. Create a folder in `/src/mongodb/models`.
2. Add two files: `*.model.js` and `*.datasource.js`.



```javascript
// src/mongodb/models/user/user.model.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const UserModel = model('user', userSchema);
module.exports = {
    UserModel
};
```

`*.model.js` files define the schema for the model and export the model. This example defines a `User` model with `id` and `name` fields.


```javascript
// src/mongodb/models/user/user.datasource.js
const { MongoDataSource } = require('apollo-datasource-mongodb')
const { UserModel } = require('./user.model.js');

class UserDataSource extends MongoDataSource {
    async getUserById(id) {
        return this.model.findOne({ id });
    }
}

module.exports = {
    name: "UserDataSource",
    model: UserModel,
    datasource: UserDataSource
};
```

`*.datasource.js` files define the datasource for the model and export an object containing the model name, model, and datasource. This example defines a `UserDataSource` with a method to get a user by ID.

#### Sequelize

1. Create a folder in `/src/sequelize/models`.
2. Add a single file: `*.model.js`.


```javascript
// src/sequelize/models/user/user.model.js
const { DataTypes, Model } = require('sequelize');

class UserModel extends Model {
    static getUserById(id) {
        return this.findByPk(id);
    }
}

const UserModelDefination = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

module.exports = {
    modelName: 'User',
    model: UserModel,
    defination: UserModelDefination
};
```

`*.model.js` files define the model for the datasource and export an object containing the model name, model, and model defination. This example defines a `User` model with `id`, `name`, `email`, and `password` fields.

### Prefix in Sequelize Datasources

To prevent naming clashes between similar names, there is a prefix for Sequelize datasources which can be changed through the environment variable `SEQUELIZE_PREFIX`. The default prefix is "pg".

### Support for MySQL, MariaDB, SQLite, and Microsoft SQL Server

As Sequelize supports multiple databases, the setup for MySQL, MariaDB, SQLite, and Microsoft SQL Server is similar to PostgreSQL. The difference will be changing the environment variables and the database dialect in the Sequelize configuration.

## Managing Session Data

NRTGMP uses Iron Session for managing session data. The session data is stored in cookies and encrypted using Iron. The session data can be accessed in API routes, GraphQL resolvers and Sever components & actions.

### Setting Up Session

To start using session data, add session fields in the `defaultSession` object in `/src/lib/session/options.js`. You can also customize Iron session options in the `serverOptions` object.

```javascript
// src/lib/session/options.js

export const serverOptions = {
    cookieName: process.env.SESSION_COOKIE_NAME || "NSESSION",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export const defaultSession = {
    user: "Guest",
};
```

### Accessing Session Data

If the session is not set, the default session data will be returned. You can modify the session data directly like a JavaScript object and call `session.save()` to save the changes.

#### In API Routes, Server Components, and Actions

Session data is accessed in API routes, server components, and actions using the `getSession` function from `@/lib/session/fromCookies`.

```javascript
import { getSession } from '@/lib/session/fromCookies';

export async function Something(request) {
    const session = await getSession();
    session.user = "New User";
    await session.save();
}
```

In this example, `Something` can be an API route, server component, or action.

#### In GraphQL Resolvers

Session data is accessed in GraphQL resolvers using the `session` object from `context`.

```javascript
// src/graphql/user/user.resolver.js
module.exports = { 
    Query: {
        users: async (parent, args, { session }) => {
            session.user = "New User";
            await session.save();
        }
    }
}
```

# Connecting to Apollo Client

All things are there in this documentation but if you want to explore more 
you can refer [Refrence for ApolloClient](https://www.apollographql.com/docs/react/get-started)

The naive example is shown in app/layout.js
add 'use client'

```javascript
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// adding the client route adding here default ones 
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

// Wrapp in this fashion
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {/* Wrapping the Apollo client for the HomePage */}
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
```

### Using Queries and Mutation on the client side 

You should add the import as shown you can choose between useMutation and useQuery as per your need

```javascript
import { useMutation, useQuery, gql } from '@apollo/client';
```

### For Query

First of all add the Query 
```javascript
const QUERY_NAME = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;
```

After the setting the query add this inside of your function 

```javascript
const { loading, error, data } = useQuery(QUERY_NAME);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error : {error.message}</p>;
```

Now you are ready you can map and display the data as per your need

### For Mutation 

First of all add the Mutation query 

```javascript
const ADDLIKE = gql`
  mutation Mutation($addLikeId: Int!) {
  addLike(id: $addLikeId) {
    username
    likes
    id
    description
    comments {
      username
      likes
      id
      description
    }
  }
}
`;
```
Then add the following inside your function 

```javascript
const [addLike, { data, loading, error }] = useMutation(ADDLIKE);
if (loading) return 'Submitting...';
if (error) return `Submission error! ${error.message}`;
```

# If there are variable for input 

Then simply follow this for both query as well as mutation.

eg : I'm taking the mutation from above mutation query refer that, you can follow for query as well. 

```javascript
const [addLike, { data, loading, error }] = useMutation(ADDLIKE);

//Let's assume we're performing onClick on the button and function is handleLikes and it needs id
// This function is also inside the function and here I'm giving default value you can pass variable instead
const handleLikes = () => {
  addLike({
    variables : {
      addLikeId: 1
    }
  })
}
```


## Shadcn Components

Let's say you want to add a Button but it is already setup 
Visit this website [ShadCn](https://ui.shadcn.com/docs/components/accordion)

Here I'll get the following for the button 

```javascript
npx shadcn@latest add button
```
As it is already setup you'll see the components directory in the root 
You can modify that as well after installing.

You can simply import the component as follows 
```javascript
import { Button } from "@/components/ui/button"
```

We're ready to use it 
```javascript
<Button variant="outline">Button</Button>
<Button variant="destructive">Button</Button>
<Button variant="default">Button</Button>
<Button variant="secondary">Button</Button>
<Button variant="ghost">Button</Button>
<Button variant="link">Button</Button>
```
You can also modify them by easy TailwindCss change

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project.
- `npm run start`: Start the production server.
- `npm run lint`: Run the linter.
