'use client';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    lazy: true,
    keepAlive: 5000,
    retryAttempts: Infinity, // Auto-reconnects WebSocket
    shouldRetry: () => true, // Always retry if WebSocket fails
    on: {
      opened: () => console.log("WebSocket Connection Opened"),
      closed: () => console.warn("WebSocket Connection Closed"),
      error: (err) => console.error("WebSocket Error:", err),
    },
  })
);

// Use WebSockets for subscriptions, HTTP for queries/mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
