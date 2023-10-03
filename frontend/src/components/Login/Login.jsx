import './Login.css';
import { INPUT_LIST_lOGIN } from '../../utils/constants/constants';
import useInput from '../../utils/Validation/Validation';
import FormSign from '../../blocks/FormSign/FormSign';

function Login({
  logIn,
  location,
  textServerError,
  setTextServerError,
  isLoading,
}) {
  const email = useInput('', {
    isEmpty: true,
    isEmail: true,
  });

  const password = useInput('', {
    isEmpty: true,
    minLength: 8,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.value || !password.value) {
      return;
    }
    logIn(email.value, password.value);
  };

  return (
    <div className="login">
      <FormSign
        inputList={INPUT_LIST_lOGIN}
        title={'Рады видеть!'}
        nameButtonSubmit={'Войти'}
        textAfterButton={'Ещё не зарегистрированы? '}
        textLink={'Регистрация'}
        linkValue={'sign-up'}
        email={email}
        location={location}
        password={password}
        textServerError={textServerError}
        setTextServerError={setTextServerError}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      ></FormSign>
    </div>
  );
}

export default Login;
