const showInputError = (formElement, inputElement, errorMessage, validateConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateConfig.inputErrorClass);
  errorElement.classList.remove(validateConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validateConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateConfig);
  } else {
    hideInputError(formElement, inputElement, validateConfig);
  }
};

const setEventListeners = (formElement, validateConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validateConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validateConfig);
      toggleButtonState(inputList, buttonElement, validateConfig);
    });
  });
};

const hasInvalidInput = (inputList) => {
  if (inputList.length == 0) return true;
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement, validateConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validateConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

export const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector))
  formList.forEach((formElement) => {
    setEventListeners(formElement, validateConfig);
  });
};
