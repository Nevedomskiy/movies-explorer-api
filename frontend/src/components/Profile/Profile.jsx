// import { Link } from 'react-router-dom';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import useInput from '../../utils/Validation/Validation';
import {
  ERROR_MESSAGE,
  SUCCESSFUL_MESSAGE,
} from '../../utils/constants/constants';

function Profile({
  logOut,
  editProfile,
  textServerError,
  activeInputs,
  setActiveInputs,
  succesReq,
  isLoading,
  setTextServerError,
}) {
  const userData = useContext(CurrentUserContext);

  const email = useInput('', {
    isEmpty: true,
    isEmail: true,
  });

  const name = useInput('', {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
    isName: true,
  });

  function handleExit(e) {
    e.preventDefault();
    email.updateValue(userData.email);
    name.updateValue(userData.name);
    setActiveInputs(true);
    email.onExit();
    name.onExit();
  }

  function handleCancel(e) {
    e.preventDefault();
    setActiveInputs(false);
    email.onExit();
    name.onExit();
  }

  function handleSave(e) {
    e.preventDefault();
    editProfile({
      name: name.value,
      email: email.value,
    });
    if (textServerError === '') {
      email.onExit();
      name.onExit();
    }
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {userData.name}!</h1>
      <form name={'profile-edit'} className="profile__form" noValidate>
        <ul className="profile__list list">
          <li className="profile__element">
            <p className="profile__description">Имя</p>
            {activeInputs ? (
              <input
                type="text"
                required
                onChange={(e) => {
                  name.onChange(e);
                  setTextServerError('');
                }}
                value={name.value}
                name="name"
                className={`profile__input profile__input_active ${
                  !name.isValid
                    ? 'profile__input_valid'
                    : 'profile__input_no-valid'
                }`}
              ></input>
            ) : (
              <p className="profile__text">{userData.name}</p>
            )}
            <div className="profile__errors errors">
              {name.isDirty && userData.name === name.value && (
                <p className="errors__info">{ERROR_MESSAGE.NAME_REPEATED}</p>
              )}
              {name.isDirty && name.isEmpty && (
                <p className="errors__element">{ERROR_MESSAGE.EMPTY_VALUE}</p>
              )}
              {name.isDirty && name.isName && (
                <p className="errors__element">
                  {ERROR_MESSAGE.NOT_VALID_NAME}
                </p>
              )}
              {name.isDirty && (name.minLengthError || name.maxLengthError) && (
                <p className="errors__element">
                  {ERROR_MESSAGE.INCORRECT_LENGTH}
                </p>
              )}
            </div>
          </li>
          <li className="profile__element">
            <p className="profile__description">E-mail</p>
            {activeInputs ? (
              <input
                type="email"
                required
                onChange={(e) => {
                  email.onChange(e);
                  setTextServerError('');
                }}
                value={email.value}
                className={`profile__input profile__input_active ${
                  !email.isValid
                    ? 'profile__input_valid'
                    : 'profile__input_no-valid'
                }`}
              ></input>
            ) : (
              <p className="profile__text">{userData.email}</p>
            )}
            <div className="profile__errors errors">
              {email.isDirty && email.isEmpty && (
                <p className="errors__element">{ERROR_MESSAGE.EMPTY_VALUE}</p>
              )}
              {email.isDirty && email.isEmail && (
                <p className="errors__element">
                  {ERROR_MESSAGE.NOT_VALID_EMAIL}
                </p>
              )}
              {email.isDirty && userData.email === email.value && (
                <p className="errors__info">{ERROR_MESSAGE.EMAIL_REPEATED}</p>
              )}
            </div>
          </li>
        </ul>

        <div className="profile__whitespace"></div>
        {activeInputs ? (
          (userData.name === name.value && userData.email === email.value) ||
          (name.value === '' && email.value === '') ? (
            <button
              type="button"
              onClick={handleCancel}
              className="profile__btn button hover-link profile__btn_cancel"
            >
              Отменить
            </button>
          ) : (
            <div className="profile__block-save errors">
              {textServerError !== '' && !email.isDirty && !name.isDirty && (
                <p className="profile__server-info profile__server-info_error">
                  {textServerError}
                </p>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={email.isValid || name.isValid || isLoading}
                className={`profile__btn button hover-link  ${
                  !(email.isValid || name.isValid) &&
                  textServerError === '' &&
                  !isLoading
                    ? 'profile__btn_save'
                    : 'profile__btn_blocked'
                }`}
              >
                Сохранить
              </button>
            </div>
          )
        ) : (
          <div className="profile__block-save">
            {succesReq && (
              <p className="profile__server-info">
                {SUCCESSFUL_MESSAGE.SAVE_DATA}
              </p>
            )}

            <button
              type="button"
              onClick={handleExit}
              className="profile__btn button profile__btn_edit hover-link"
            >
              Редактировать
            </button>
          </div>
        )}
      </form>
      <button
        type="button"
        onClick={logOut}
        className="profile__btn button profile__btn_signout hover-link"
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
