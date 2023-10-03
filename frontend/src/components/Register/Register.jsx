import './Register.css';
import { INPUT_LIST_REGISTER } from '../../utils/constants/constants';
import FormSign from '../../blocks/FormSign/FormSign';
import useInput from '../../utils/Validation/Validation';

function Register({
  register,
  location,
  setTextServerError,
  textServerError,
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

  const name = useInput('', {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
    isName: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email.value, password.value, name.value);
  };

  return (
    <div className="register">
      <FormSign
        inputList={INPUT_LIST_REGISTER}
        title={'Добро пожаловать!'}
        nameButtonSubmit={'Зарегистрироваться'}
        textAfterButton={'Уже зарегистрированы? '}
        textLink={'Войти'}
        linkValue={'sign-in'}
        modific={'register_mod-container'}
        handleSubmit={handleSubmit}
        setTextServerError={setTextServerError}
        email={email}
        password={password}
        name={name}
        location={location}
        textServerError={textServerError}
        isLoading={isLoading}
      ></FormSign>
    </div>
  );
}

export default Register;
