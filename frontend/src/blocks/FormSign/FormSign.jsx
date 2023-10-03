import { Link } from 'react-router-dom';
import ButtonHome from '../ButtonHome/ButtonHome';
import './FormSign.css';
import { ERROR_MESSAGE } from '../../utils/constants/constants';

function FormSign({
  title,
  inputList,
  location,
  nameButtonSubmit,
  textAfterButton,
  handleSubmit,
  isLoading,
  textLink,
  linkValue,
  modific,
  email,
  password,
  name,
  textServerError,
}) {
  const handleValue = (type) => {
    if (type === 'password') {
      return password.value;
    } else if (type === 'email') {
      return email.value;
    } else {
      return name.value;
    }
  };

  const handleChange = (type) => {
    // setTextServerError('');
    if (type === 'password') {
      return password.onChange;
    } else if (type === 'email') {
      return email.onChange;
    } else {
      return name.onChange;
    }
  };

  return (
    <form
      name={'form-sign'}
      className="form-sign"
      noValidate
      onSubmit={(e) => {
        handleSubmit(e);
        if (location.pathname === '/sign-in') {
          email.onExit();
          password.onExit();
        } else {
          email.onExit();
          password.onExit();
          name.onExit();
        }
      }}
    >
      <ButtonHome modification={'form-sign__button-home'}></ButtonHome>
      <h1 className="form-sign__title">{title}</h1>
      <div className={`form-sign__container ${modific}`}>
        <ul className="form-sign__list list">
          {inputList.map((element) => {
            return (
              <li className="form-sign__element" key={element.type}>
                <label
                  htmlFor={element.type}
                  className="form-sign__description"
                >
                  {element.description}
                </label>
                <input
                  required
                  value={handleValue(element.type)}
                  className="form-sign__input"
                  id={element.type}
                  name={element.type}
                  type={element.type}
                  onChange={handleChange(element.type)}
                />
                {element.type === 'email' && (
                  <div className="form-sign__errors errors">
                    {email.isDirty && email.isEmpty && (
                      <div className="errors__element">
                        {ERROR_MESSAGE.EMPTY_VALUE}
                      </div>
                    )}
                    {email.isDirty && email.isEmail && (
                      <div className="errors__element">
                        {ERROR_MESSAGE.NOT_VALID_EMAIL}
                      </div>
                    )}
                  </div>
                )}
                {element.type === 'password' && (
                  <div className="form-sign__errors errors">
                    {password.isDirty && password.isEmpty && (
                      <div className="errors__element">
                        {ERROR_MESSAGE.EMPTY_VALUE}
                      </div>
                    )}
                    {password.isDirty && password.minLengthError && (
                      <div className="errors__element">
                        {ERROR_MESSAGE.INCORRECT_LENGTH}
                      </div>
                    )}
                  </div>
                )}
                {element.type === 'text' && (
                  <div className="form-sign__errors errors">
                    {name.isDirty && name.isEmpty && (
                      <div className="errors__element">
                        {ERROR_MESSAGE.EMPTY_VALUE}
                      </div>
                    )}
                    {name.isDirty && name.isName && (
                      <div className="errors__element">
                        {ERROR_MESSAGE.NOT_VALID_NAME}
                      </div>
                    )}
                    {name.isDirty &&
                      (name.minLengthError || name.maxLengthError) && (
                        <div className="errors__element">
                          {ERROR_MESSAGE.INCORRECT_LENGTH}
                        </div>
                      )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="form-sign__whitespace"></div>

        <div className="form-sign__block-submit">
          {textServerError !== '' && !email.isDirty && !password.isDirty && (
            <p className={`form-sign__server-error errors__element`}>
              {textServerError}
            </p>
          )}
          <button
            type="submit"
            disabled={
              name
                ? email.isValid || password.isValid || name.isValid || isLoading
                : email.isValid || password.isValid || isLoading
            }
            className={`form-sign__button-submit button ${
              email.isValid || password.isValid
                ? 'form-sign__button-submit_no-valid'
                : ''
            }`}
          >
            {nameButtonSubmit}
          </button>
          <p className="form-sign__text">
            {textAfterButton}
            <Link to={`/${linkValue}`} className="form-sign__link">
              {textLink}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default FormSign;
