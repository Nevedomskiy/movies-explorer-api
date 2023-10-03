import { useState, useEffect } from 'react';
import { VALIDATION_RE } from '../constants/constants';

function useValidation(value, validations) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      for (const validation in validations) {
        switch (validation) {
          case 'minLength':
            value.length < validations[validation]
              ? setMinLengthError(true)
              : setMinLengthError(false);
            break;
          case 'isEmpty':
            value ? setIsEmpty(false) : setIsEmpty(true);
            break;
          case 'maxLength':
            value.length > validations[validation]
              ? setMaxLengthError(true)
              : setMaxLengthError(false);
            break;
          case 'isEmail':
            VALIDATION_RE.EMAIL.test(String(value).toLowerCase())
              ? setIsEmail(false)
              : setIsEmail(true);
            break;
          case 'isName':
            // eslint-disable-next-line no-useless-escape
            VALIDATION_RE.NAME.test(String(value).toLowerCase())
              ? setIsName(false)
              : setIsName(true);
            break;
          // no default
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || isEmail || isName) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isEmpty, minLengthError, maxLengthError, isEmail, isName]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmail,
    isName,
    isValid,
  };
}

function useInput(initialValue, validations) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
    setIsDirty(true);
  };

  const updateValue = (data) => {
    setValue(data);
  };

  const onExit = () => {
    setIsDirty(false);
  };

  return {
    value,
    onExit,
    onChange,
    isDirty,
    updateValue,
    ...valid,
  };
}

export default useInput;
