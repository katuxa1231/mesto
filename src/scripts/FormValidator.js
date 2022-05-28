export class FormValidator {
  constructor(params, form) {
    this._params = params;
    this._form = form;
  }

  _showInputError(formElement, inputElement, errorMessage, errorClasses) {
    const { inputErrorClass, errorClass } = errorClasses;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError(formElement, inputElement, errorClasses) {
    const { inputErrorClass, errorClass } = errorClasses;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _isValid(formElement, inputElement, errorClasses) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, errorClasses);
    } else {
      this._hideInputError(formElement, inputElement, errorClasses);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    this._buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, rest);
        this._toggleButtonState(inputList, this._buttonElement, inactiveButtonClass);
      });
    });
  };

  _disabledButton() {
    this._buttonElement.classList.add('form__submit-button_inactive');
    this._buttonElement.disabled = true;
  }

  _clearError() {
    const inputErrorList = this._form.querySelectorAll('.form__input_type_error');
    if (inputErrorList.length) {
      inputErrorList.forEach((inputErrorElement) => {
        inputErrorElement.classList.remove('form__input_type_error');
        const errorElement = this._form.querySelector(`.${inputErrorElement.id}-error`);
        errorElement.classList.remove('form__input-error_active');
        errorElement.textContent = '';
      });
    }
  }

  resetValidation() {
    this._disabledButton();
    this._clearError();
  }

  enableValidation() {
    this._setEventListeners(this._form, this._params);
  };
}
