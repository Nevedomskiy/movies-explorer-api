import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useResize } from '../../utils/UseResize/UseResize';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { mainApi } from '../../utils/MainApi/MainApi';
import { moviesApi } from '../../utils/MoviesApi/MoviesApi';
import { ERROR_MESSAGE } from '../../utils/constants/constants';

function App() {
  const location = useLocation();
  const { width } = useResize();
  const navigate = useNavigate();
  const [isValidSearch, setIsValidSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [textSearchError, setTextSearchError] = useState('');
  const [textServerError, setTextServerError] = useState('');
  const [activeInputs, setActiveInputs] = useState(false);
  const [succesReq, setSuccesReq] = useState(false);

  useEffect(() => {
    handleUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      checkSavedMovies();
      heandleAllMovies();
    }
    setTextServerError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleUserInfo() {
    mainApi
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch((err) => {
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        console.log(err);
      });
  }

  function showSuccesReq() {
    setSuccesReq(true);
    setTimeout(() => {
      setSuccesReq(false);
    }, 3000);
  }

  const checkSavedMovies = () => {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setIsLoading(false);
        setIsValidSearch(false);
      })
      .catch((err) => {
        setTextSearchError(ERROR_MESSAGE.SERVER_OUT);
        if (isValidSearch) {
          setIsLoading(false);
          setIsValidSearch(true);
        }
      });
  };

  const logOut = () => {
    setIsLoading(true);
    mainApi
      .signOut()
      .then((res) => {
        setCurrentUser({});
        setLoggedIn(false);
        setIsLoading(false);
        navigate('/', { replace: true });
        localStorage.clear();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const addMovie = (data) => {
    setIsLoading(true);
    mainApi
      .addMovie(data)
      .then((movies) => {
        setIsLoading(false);
        setSavedMovies([...savedMovies, movies]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteMovie = (id) => {
    setIsLoading(true);
    mainApi
      .deleteMovie(id)
      .then(() => {
        setIsLoading(false);
        setSavedMovies(savedMovies.filter((el) => el._id !== id));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const logIn = (email, password) => {
    setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        setIsLoading(false);
        navigate('/movies', { replace: true });
        handleUserInfo();
      })
      .catch((err) => {
        err.then(({ message }) => {
          setIsLoading(false);
          setTextServerError(message);
        });
      });
  };

  const register = (email, password, name) => {
    setIsLoading(true);
    mainApi
      .register(email, password, name)
      .then(() => {
        setIsLoading(false);
        logIn(email, password);
      })
      .catch((err) => {
        err.then(({ message }) => {
          setIsLoading(false);
          setTextServerError(message);
        });
      });
  };

  const editProfile = (data) => {
    setIsLoading(true);
    mainApi
      .changeUserInfo(data)
      .then((res) => {
        setActiveInputs(false);
        setCurrentUser(res);
        setIsLoading(false);
        showSuccesReq();
      })
      .catch((err) => {
        handleUserInfo();
        err.then(({ message }) => {
          setIsLoading(false);
          setTextServerError(message);
        });
      });
  };

  const heandleAllMovies = () => {
    setIsLoading(true);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        setAllMovies(movies);
        setIsLoading(false);
        setIsValidSearch(false);
      })
      .catch((err) => {
        setTextSearchError(ERROR_MESSAGE.SERVER_OUT);
        if (!isValidSearch) {
          setIsValidSearch(true);
        }
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="bodywork">
        <div className={`page ${location.pathname === '/' ? 'page_main' : ''}`}>
          <Header loggedIn={loggedIn} />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/sign-up"
              element={
                <Register
                  location={location}
                  register={register}
                  setTextServerError={setTextServerError}
                  isLoading={isLoading}
                  textServerError={textServerError}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  location={location}
                  logIn={logIn}
                  setTextServerError={setTextServerError}
                  isLoading={isLoading}
                  textServerError={textServerError}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  moviesList={allMovies}
                  savedMovies={savedMovies}
                  isValid={isValidSearch}
                  setIsValid={setIsValidSearch}
                  isLoading={isLoading}
                  width={width}
                  addMovie={addMovie}
                  deleteMovie={deleteMovie}
                  location={location}
                  setIsLoading={setIsLoading}
                  element={Movies}
                  setTextSearchError={setTextSearchError}
                  textSearchError={textSearchError}
                ></ProtectedRouteElement>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  width={width}
                  isValid={isValidSearch}
                  setIsValid={setIsValidSearch}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  moviesList={savedMovies}
                  savedMovies={savedMovies}
                  location={location}
                  element={Movies}
                  deleteMovie={deleteMovie}
                  setTextSearchError={setTextSearchError}
                  textSearchError={textSearchError}
                ></ProtectedRouteElement>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Profile}
                  logOut={logOut}
                  editProfile={editProfile}
                  activeInputs={activeInputs}
                  succesReq={succesReq}
                  setActiveInputs={setActiveInputs}
                  textServerError={textServerError}
                  setTextServerError={setTextServerError}
                  isLoading={isLoading}
                ></ProtectedRouteElement>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Routes>
            <Route path="/movies" element={<Footer />} />
            <Route path="/saved-movies" element={<Footer />} />
            <Route path="/" element={<Footer />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
