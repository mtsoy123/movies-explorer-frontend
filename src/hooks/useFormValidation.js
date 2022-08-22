import React, {useCallback, useState} from 'react';
import {emailRegExp, nameRegExp, passwordRegExp} from '../utils/regExps';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    // console.log(event.target.value);
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage || ''});
    setIsValid(target.closest('form').checkValidity());
  };

  const onChange = (regExp, message, event) => {
    if (regExp.test(event.target.value)) {
      event.target.setCustomValidity('')
    } else {
      event.target.setCustomValidity(message)
    }
    handleChange(event)
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function nameValidation(event) {
    onChange(nameRegExp, 'Поле может содержать только латиницу, кириллицу, пробел или дефис', event)
  }

  function emailValidation(event) {
    onChange(emailRegExp, 'Введите корректный email. Например, email@example.com', event)
  }

  const passwordValidation = (event) => {
    onChange(passwordRegExp, 'Заполните поле', event)
  }

  return {
    values,
    onChange,
    handleChange,
    errors,
    isValid,
    resetForm,
    nameValidation,
    emailValidation,
    passwordValidation
  };
}
