import './Footer.css';
import HoverLink from '../../blocks/HoverLink/HoverLink';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container" aria-label="Описание сайта">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__content">
          <ul className="list footer__list">
            <li className="footer__element ">
              <HoverLink
                link={'https://practicum.yandex.ru/'}
                modificBlock={'footer__link footer__link_yandex'}
                text={'Яндекс.Практикум'}
              ></HoverLink>
            </li>
            <li className="footer__element">
              <HoverLink
                link={'https://github.com/Nevedomskiy'}
                modificBlock={'footer__link footer__link_git'}
                text={'Github'}
              ></HoverLink>
            </li>
          </ul>
          <p className="footer__data">© 2023</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
