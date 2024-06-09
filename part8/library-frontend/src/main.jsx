import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((gqlreq, prevContext) => {
    const token = localStorage.getItem("library-user-token")

    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : null
        }
    }
})

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
})

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }))

const splitLink = split(
    (operation) => {
        const definition = getMainDefinition(operation.query)

        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        )
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <App />
            </Router>
        </ApolloProvider>
    </React.StrictMode>
);
