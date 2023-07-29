import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag'


const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Basic resolver
// const resolvers = {
//     Query: {
//         hello: () => 'Hello World'
//     },
// };

const resolvers = {
    Query: {
        user(parent, args, contextValue, info) {
            return users.find((user) => user.userId === args.userId);
        },
    },
    User: {
        orders(parent) {
            return orders.filter((order) => order.userId === parent.userId)
        }
    },
    Order: {
        items(parent) {
            return parent.items.map((itemId) => {
                return items.find((item) => item.itemId === itemId)
            })
        },
        orderPrice(parent) {
            return parent.items.map((itemId) => {
                return items.find((item) => item.itemId === itemId)
            }).reduce((sum, item) => sum + item.itemPrice, 0)
        }

    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
export default startServerAndCreateNextHandler(apolloServer);

const typeDefs = gql`
  type Query {
    user(userId: Int): User
  }

  type User {
    userId: Int,
    firstName: String,
    lastName: String,
    email: String
    orders: [Order]
  }

  type Order {
    orderId: Int,
    orderDate: String,
    orderPrice: Float,
    user: User, 
    items: [Item]
  }

  type Item {
    itemId: Int,
    itemName: String,
    itemPrice: Float
  }

`;

// This can be sent from the frontend in req.body
const users = [
    {
        userId: 1234,
        firstName: 'John',
        lastName: 'Smith',
        email: 'johnsmith@example.com'
    },
    {
        userId: 1235,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com'
    }
]

const orders = [
    {
        orderId: 1111,
        orderDate: '2023-01-01T00:00:00Z',
        userId: 1234,
        items: [1, 1]
    },
    {
        orderId: 2222,
        orderDate: '2023-01-08T00:00:00Z',
        userId: 1234,
        items: [1]
    },
    {
        orderId: 3333,
        orderDate: '2023-01-15T00:00:00Z',
        userId: 1234,
        items: [1, 2]
    },
    {
        orderId: 4444,
        orderDate: '2023-01-01T00:00:00Z',
        userId: 1235,
        items: [2, 2]
    },
]

const items = [
    {
        itemId: 1,
        itemName: 'GraphQL Magazine',
        itemPrice: 20.00,
    },
    {
        itemId: 2,
        itemName: 'Coffee',
        itemPrice: 10.00,
    },
]