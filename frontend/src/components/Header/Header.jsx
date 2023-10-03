// import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';

import './Header.css';
import ButtonHome from '../../blocks/ButtonHome/ButtonHome';
import СommonElementHeader from '../../blocks/СommonElementHeader/СommonElementHeader';

function Header({ loggedIn }) {
  const [activeBurger, setActiveBurger] = useState(false);

  function handleClickBurger() {
    if (activeBurger === false) {
      setActiveBurger(true);
    } else {
      setActiveBurger(false);
    }
  }

  return (
    <header className="header">
      <Routes>
        <Route
          path="/"
          element={
            !loggedIn ? (
              <div className="header__container">
                <ButtonHome modification={'header__link'}></ButtonHome>
                <ul className="list header__list">
                  <li className="header__element">
                    <button className="button">
                      <Link
                        to="/sign-up"
                        className="header__link header__link_black "
                      >
                        Регистрация
                      </Link>
                    </button>
                  </li>
                  <li className="header__element">
                    <button className="button">
                      <Link
                        to="/sign-in"
                        className="header__link header__link_green"
                      >
                        Войти
                      </Link>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <СommonElementHeader
                setActiveBurger={setActiveBurger}
                handleClickBurger={handleClickBurger}
                activeBurger={activeBurger}
              ></СommonElementHeader>
            )
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <СommonElementHeader
              setActiveBurger={setActiveBurger}
              handleClickBurger={handleClickBurger}
              activeBurger={activeBurger}
            ></СommonElementHeader>
          }
        ></Route>
        <Route
          path="/movies"
          element={
            <СommonElementHeader
              setActiveBurger={setActiveBurger}
              handleClickBurger={handleClickBurger}
              activeBurger={activeBurger}
            ></СommonElementHeader>
          }
        ></Route>
        <Route
          path="/saved-movies"
          element={
            <СommonElementHeader
              setActiveBurger={setActiveBurger}
              handleClickBurger={handleClickBurger}
              activeBurger={activeBurger}
            ></СommonElementHeader>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
