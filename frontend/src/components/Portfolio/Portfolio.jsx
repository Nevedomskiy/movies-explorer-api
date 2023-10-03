import './Portfolio.css';
import arrow from '../../images/arrow.svg';
import HoverLink from '../../blocks/HoverLink/HoverLink';

function Portfolio() {
  return (
    <section className="container portfolio__container" aria-label="Портфолио">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="list portfolio__list">
        <li className="portfolio__element">
          <HoverLink
            link={'https://github.com/Nevedomskiy/how-to-learn'}
            modificBlock={'portfolio__link'}
            modificText={'portfolio__description'}
            text={'Статичный сайт'}
          >
            <img className="portfolio__link-icon" src={arrow} alt="Стрелка" />
          </HoverLink>
        </li>

        <li className="portfolio__element">
          <HoverLink
            link={'https://github.com/Nevedomskiy/Travel-to-Russia'}
            modificBlock={'portfolio__link'}
            modificText={'portfolio__description'}
            text={'Адаптивный сайт'}
          >
            <img className="portfolio__link-icon" src={arrow} alt="Стрелка" />
          </HoverLink>
        </li>

        <li className="portfolio__element ">
          <HoverLink
            link={'https://github.com/Nevedomskiy/react-mesto-auth'}
            modificBlock={'portfolio__link'}
            modificText={'portfolio__description'}
            text={'Одностраничное приложение'}
          >
            <img className="portfolio__link-icon" src={arrow} alt="Стрелка" />
          </HoverLink>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
