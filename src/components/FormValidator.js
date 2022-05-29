export class FormValidator {
  constructor(params, form) {
    this._params = params;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._params.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._params.inputErrorClass);
    errorElement.classList.remove(this._params.errorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton(this._params.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._params.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._form.querySelector(this._params.submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _disabledButton() {
    this._buttonElement.classList.add(this._params.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _clearError() {
    const inputErrorList = this._form.querySelectorAll(`.${this._params.inputErrorClass}`);
    if (inputErrorList.length) {
      inputErrorList.forEach((inputErrorElement) => {
        this._hideInputError(inputErrorElement);
      });
    }
  }

  resetValidation() {
    this._disabledButton();
    this._clearError();
  }

  enableValidation() {
    this._setEventListeners();
  };
}
