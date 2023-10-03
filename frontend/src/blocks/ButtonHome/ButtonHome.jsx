import { Link } from 'react-router-dom';
import './ButtonHome.css';

function ButtonHome({ modification }) {
  return <Link to="/" className={`button-home ${modification}`}></Link>;
}

export default ButtonHome;
