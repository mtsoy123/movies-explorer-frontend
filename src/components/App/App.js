import './App.css';
import Main from '../Main/Main';
import {useContext, useEffect, useState} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import userContext from '../../context/userContext';
import {mainApi} from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState(useContext(userContext));
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    checkToken()
  }, [])

  function checkToken() {
    const path = location.pathname;
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.getProfile(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          setCurrentUser({
            email: res.email,
            name: res.name
          });
          history.push(path)
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      history.push('/signin')
    }

  }

  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
      <section className={`app ${menuOpened && 'app_type_modal_opened'}`}>
        <Switch>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}

            component={Movies}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />

          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}

            component={SavedMovies}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />

          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}

            component={Profile}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            setLoggedIn={setLoggedIn}
          />
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
          <Route
            exact
            path="/">

            <Main
              loggedIn={loggedIn}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </section>
    </userContext.Provider>
  );
}

export default App;
