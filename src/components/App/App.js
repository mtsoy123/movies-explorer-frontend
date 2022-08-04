import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <section className='app'>
      <Header loggedIn={loggedIn}/>
      <Switch>
        <Route path='/movies'>

        </Route>
        <Route path='/saved-movies'>

        </Route>
        <Route path='/profile'>

        </Route>
        <Route path='/signin'>

        </Route>
        <Route path='/signup'>

        </Route>
        <Route exact path='/'>
          <Main/>
        </Route>
      </Switch>

      <Footer/>
    </section>
  );
}

export default App;
