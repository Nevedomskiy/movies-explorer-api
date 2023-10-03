import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab({ activeNav, setActiveBurger }) {
  return (
    <nav className={`nav ${activeNav ? 'nav_active' : ''}`}>
      <div className="nav__container">
        <ul className="nav__list list">
          <li className="nav__element nav-element">
            <button
              type="button"
              onClick={() => {
                setActiveBurger(false);
              }}
              className="button"
            >
              <Link
                to="/"
                className="button nav-element__button nav-element__button_home hover-link"
              >
                Главная
              </Link>
            </button>
          </li>
          <li className="nav__element nav-element">
            <button
              type="button"
              onClick={() => {
                setActiveBurger(false);
              }}
              className="button"
            >
              <Link
                to="/movies"
                className="button nav-element__button hover-link"
              >
                Фильмы
              </Link>
            </button>
          </li>
          <li className="nav__element nav-element">
            <button
              type="button"
              onClick={() => {
                setActiveBurger(false);
              }}
              className="button"
            >
              <Link
                to="/saved-movies"
                className="button nav-element__button hover-link"
              >
                Сохранённые фильмы
              </Link>
            </button>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => {
            setActiveBurger(false);
          }}
          className="button"
        >
          <Link to="/profile" className="nav__button-profile">
            Аккаунт
          </Link>
        </button>
      </div>
    </nav>
  );
}

export default NavTab;
