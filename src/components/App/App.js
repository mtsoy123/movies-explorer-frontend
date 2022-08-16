import './App.css';
import Main from '../Main/Main';
import {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import userContext from '../../context/userContext';
import {mainApi} from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  /*useEffect(() => {
    console.log(currentUser)
  }, [currentUser])*/
  useEffect(() => {
    mainApi.getProfile()
    .then(res => {
      setCurrentUser({
        email: res.email,
        name: res.name
      })
    })
  }, [])

  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
      <section className={`app ${menuOpened && 'app_type_modal_opened'}`}>
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
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
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              // userName="Михаил"
              // userEmail="qwe@qwe.com"
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/signin">
            <Login
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/signup">
            <Register
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/404">
            <NotFound/>
          </Route>
        </Switch>
      </section>
    </userContext.Provider>
  );
}

export default App;
