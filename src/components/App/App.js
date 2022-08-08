import './App.css';
import Main from '../Main/Main';
import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <section className={`app ${menuOpened && 'app_type_modal_opened'}`}>
      <Switch>
        <Route exact path="/">
          <Main
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        </Route>
        <Route path="/movies">
          <Movies
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/profile">
          <Profile
            userName="Михаил"
            userEmail="qwe@qwe.com"
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/404">
          <NotFound/>
        </Route>
      </Switch>
    </section>
  );
}

export default App;
