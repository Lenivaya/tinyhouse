import React from "react";
import ReactDOM from "react-dom";
import { Listings } from "./sections";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "http://localhost:9000/api"
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Listings title="TInyhouse Listings" />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
