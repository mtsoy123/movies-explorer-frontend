import './App.css';
import Main from '../Main/Main';
import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <section className='app'>
      <Switch>
        <Route path='/movies'>
          <Movies
            loggedIn={loggedIn}
          />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies
            loggedIn={loggedIn}
          />
        </Route>
        <Route path='/profile'>
          <Profile
            userName='Михаил'
            userEmail='qwe@qwe.com'
            loggedIn={loggedIn}
          />
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <Register/>
        </Route>
        <Route exact path='/'>
          <Main/>
        </Route>
      </Switch>


    </section>
  );
}

export default App;
