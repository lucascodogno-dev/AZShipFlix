import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
