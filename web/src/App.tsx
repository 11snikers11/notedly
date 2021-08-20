import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ReactDOM from 'react-dom';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages/Index';
import Cache from './utils/cache';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('tokne') || '',
    },
  };
});

const client = new ApolloClient({
  cache: Cache,
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  resolvers: {},
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
