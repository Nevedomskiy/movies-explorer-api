import './AboutMe.css';
import Title from '../../blocks/Title/Title';
import avatar from '../../images/Avatar.jpg';
import HoverLink from '../../blocks/HoverLink/HoverLink';

function AboutMe() {
  return (
    <section className="about-me__container" aria-label="Обо мне">
      <Title text={'Студент'} modification={'about-me__title'} />
      <img src={avatar} className="about-me__avatar" alt="Планета-web" />
      <h3 className="about-me__subtitle">Василий</h3>
      <p className="about-me__profetion">Фронтенд-разработчик, 25 лет</p>
      <p className="about-me__description">
        Я родился и живу в Саратове. Выучился на ветеринарного врача, отработал
        несколько лет в этой сфере и понял, что это не моё. Узнал о программе
        "Цифровые профессии", решил не упускать возможность и получить
        перспективную специальность "Фронтенд-разработчик".
      </p>

      <HoverLink
        link={'https://github.com/Nevedomskiy'}
        modificBlock={'about-me__link-git'}
        modificText={'about-me__text'}
        text={'Github'}
      ></HoverLink>
    </section>
  );
}

export default AboutMe;
