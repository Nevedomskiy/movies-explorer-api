import './AboutProject.css';
import Title from '../../blocks/Title/Title';

function AboutProject() {
  return (
    <section
      className="container about-project__container"
      aria-label="О проекте - описание"
    >
      <Title text={'О проекте'} />
      <ul className="list about-project__list">
        <li className="about-project__element">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__element">
          <h3 className="about-project__subtitle ">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="list about-project__chart chart">
        <li className="chart__element chart__element_data">1 неделя</li>
        <li className="chart__element chart__element_data">4 недели</li>
        <li className="chart__element chart__element_name">Back-end</li>
        <li className="chart__element chart__element_name">Front-end</li>
      </ul>
    </section>
  );
}

export default AboutProject;
