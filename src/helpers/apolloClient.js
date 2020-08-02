import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const endpoint = "https://phuntapp.herokuapp.com/graphql";
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: endpoint,
  //uri: "http://localhost:4000/graphql"
});
const token = localStorage.getItem("token");

const authLink = setContext((_, { headers }) => {
  // obtiene el token de autorizacion si existe del local storage
  const token = localStorage.getItem("token");
  // retorna el headers al context entonces httpLink podra leerlo
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
