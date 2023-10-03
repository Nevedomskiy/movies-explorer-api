import './Movies.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import {
  SIZE,
  NUMBER_OF_CARDS,
  ERROR_MESSAGE,
} from '../../utils/constants/constants';

function Movies({
  setTextSearchError,
  moviesList,
  isLoading,
  addMovie,
  width,
  location,
  deleteMovie,
  textSearchError,
  setIsLoading,
  isValid,
  setIsValid,
  savedMovies,
}) {
  const [failedSearch, setFailedSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentMoviesList, setCurrentMoviesList] = useState([]);
  const [quantityMovies, setQuantityMovies] = useState(null);
  const [newMovies, setNewMovies] = useState(null);
  const [isShortMovie, setIsShortMovie] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('inputSearchMovies') !== null &&
      location.pathname === '/movies'
    ) {
      setSearchValue(localStorage.getItem('inputSearchMovies'));
      updateQuantityMovies();
      return;
    } else if (
      localStorage.getItem('inputSearchSaved') !== null &&
      location.pathname === '/saved-movies'
    ) {
      setSearchValue(localStorage.getItem('inputSearchSaved'));
      updateQuantityMovies();
      return;
    } else {
      setSearchValue('');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (searchValue !== null) {
      if (location.pathname === '/movies') {
        localStorage.setItem('inputSearchMovies', searchValue);
      } else {
        localStorage.setItem('inputSearchSaved', searchValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    requestVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMoviesList]);

  useEffect(() => {
    setCurrentMoviesList(moviesList);
    updateQuantityMovies(moviesList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesList, isShortMovie]);

  function isSmoll(value) {
    return 40 >= value;
  }

  function updateQuantityMovies() {
    if (!searchValue) {
      if (isShortMovie) {
        setCurrentMoviesList(
          moviesList
            .filter((el) => isSmoll(el.duration))
            .slice(0, quantityMovies)
        );
        return;
      } else {
        setCurrentMoviesList(moviesList.slice(0, quantityMovies));
        return;
      }
    } else {
      if (isShortMovie) {
        setCurrentMoviesList(
          moviesList
            .filter((el) => isSmoll(el.duration))
            .filter((el) =>
              el.nameRU.toLowerCase().includes(searchValue.toLowerCase())
            )
            .slice(0, quantityMovies)
        );
        return;
      } else {
        setCurrentMoviesList(
          moviesList
            .filter((el) =>
              el.nameRU.toLowerCase().includes(searchValue.toLowerCase())
            )
            .slice(0, quantityMovies)
        );
        return;
      }
    }
  }

  useEffect(() => {
    updateQuantityMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityMovies]);

  useEffect(() => {
    handleQuantityMovies();
    updateQuantityMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  function handleChangeSearch(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function handleQuantityMovies() {
    if (width > SIZE.X) {
      setQuantityMovies(NUMBER_OF_CARDS.XL);
      setNewMovies(NUMBER_OF_CARDS.M);
      return;
    } else if (SIZE.M < width && width < SIZE.X) {
      setQuantityMovies(NUMBER_OF_CARDS.X);
      setNewMovies(NUMBER_OF_CARDS.S);
      return;
    } else {
      setQuantityMovies(NUMBER_OF_CARDS.L);
      setNewMovies(NUMBER_OF_CARDS.S);
      return;
    }
  }

  function handleClickButtonSwitch() {
    if (isShortMovie) {
      setIsShortMovie(false);
    } else {
      setIsShortMovie(true);
    }
    updateQuantityMovies();
  }

  function requestVerification() {
    if (currentMoviesList.length === 0) {
      setFailedSearch(true);
      return;
    } else {
      setFailedSearch(false);
      return;
    }
  }

  function handleAddMoreMovies() {
    setQuantityMovies((a) => a + newMovies);
  }

  function handleSubmitSearch(e) {
    e.preventDefault();
    setIsLoading(true);
    if (searchValue === (undefined || '')) {
      setIsValid(true);
      setTextSearchError(ERROR_MESSAGE.ENTER_VALUE);
      setIsLoading(false);
    } else {
      setCurrentMoviesList(
        moviesList
          .filter((el) =>
            el.nameRU.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, quantityMovies)
      );
      setIsValid(false);
      setIsLoading(false);
    }
  }

  return (
    <section
      className={`movies ${
        location.pathname === '/movies' ? ' movies_edit-margin' : ''
      }`}
    >
      <form
        name={'movies-search'}
        className="movies__form"
        onSubmit={handleSubmitSearch}
        noValidate
      >
        <input
          type="text"
          name="movies-input"
          className="movies__input"
          placeholder="Фильм"
          value={searchValue}
          onChange={(e) => {
            handleChangeSearch(e);
            handleQuantityMovies();
          }}
        ></input>

        <span
          className={`movies__input-error ${
            isValid ? 'movies__input-error_active' : ''
          }`}
        >
          {textSearchError}
        </span>

        <button type="submit" className="button movies__button-search">
          Найти
        </button>
      </form>

      <div className="movies__switch">
        <button
          type="button"
          onClick={handleClickButtonSwitch}
          className={`button movies__button-switch ${
            isShortMovie ? 'movies__button-switch_active' : ''
          }`}
        ></button>
        <p className="movies__description">Короткометражки</p>
      </div>

      {isLoading && moviesList.length === 0 ? (
        <Preloader />
      ) : failedSearch ? (
        <p className="movies__description">{ERROR_MESSAGE.NOT_FOUND}</p>
      ) : (
        <div className="movies__content">
          <ul className="list movies__list">
            {currentMoviesList.map((element) => (
              <MoviesCard
                moviesList={moviesList}
                addMovie={addMovie}
                movie={element}
                isLoading={isLoading}
                deleteMovie={deleteMovie}
                key={element.id || element._id}
                location={location}
                savedMovies={savedMovies}
              />
            ))}
          </ul>

          {location.pathname === '/movies' &&
          currentMoviesList.length >= quantityMovies ? (
            <button
              type="button"
              className="button movies__button-add-more-film"
              onClick={() => {
                handleAddMoreMovies();
              }}
            >
              {' '}
              Ещё
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </section>
  );
}

export default Movies;
