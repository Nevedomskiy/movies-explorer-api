import './Techs.css';
import Title from '../../blocks/Title/Title';

function Techs() {
  return (
    <section
      className="container techs__container"
      aria-label="Технологии в проекте"
    >
      <Title text={'Технологии'} modification={'techs__title'} />
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>

      <ul className="list techs__table">
        <li className="techs__element">HTML</li>
        <li className="techs__element">CSS</li>
        <li className="techs__element">JS</li>
        <li className="techs__element">React</li>
        <li className="techs__element">Git</li>
        <li className="techs__element">Express.js</li>
        <li className="techs__element">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
