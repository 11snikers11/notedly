import { BrowserRouter, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Favorites from './Favorites';
import Home from './Home';
import MyNotes from './MyNotes';
import NotePage from './Notes';
import SignUp from './SignUp';

function Pages() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/mynotes' component={MyNotes} />
        <Route path='/signup' component={SignUp} />
        <Route path='/note/:id' component={NotePage} />
      </Layout>
    </BrowserRouter>
  );
}

export default Pages;
