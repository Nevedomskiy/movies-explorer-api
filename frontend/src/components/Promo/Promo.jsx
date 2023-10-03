import planet from '../../images/planet.svg';
import './Promo.css';
import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="promo__conteiner" aria-label="Промо">
      <img src={planet} className="promo__logo" alt="Планета-web" />
      <div className="promo__content">
        <h1 className="promo__title">
          Учебный проект студента факультета{' '}
          <span className="promo__word-nowrap">Веб-разработки</span>.
        </h1>
        <h2 className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </h2>
        <Link to="/sign-in" className="promo__link">
          <button className="promo__button button">Узнать больше</button>
        </Link>
      </div>
    </section>
  );
}

export default Promo;
