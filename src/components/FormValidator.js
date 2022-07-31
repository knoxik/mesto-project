export class FormValidator { 
    constructor (parameters,form) {
        this._form = form;
        this._buttonSubmit = form.querySelector(parameters.submitButtonSelector);
        this._buttonSubmitInactive = parameters.inactiveButtonClass;
        this._inputErrorClass = parameters.inputErrorClass;
        this._errorClass = parameters.errorClass;
    }

    _setListeners () {
        this._form.addEventListener('input', this._validateForm.bind(this));
    }

    _validateForm (evt) {
        const errorElement = this._form.querySelector(`.${evt.target.id}-error`);
        this._checkInputValidity(evt.target, errorElement);
        this._toggleButtonSubmit();
    }

    _checkInputValidity (inputElement, errorElement) { 
        errorElement.textContent = inputElement.validationMessage;      
        if (inputElement.validity.valid){
            inputElement.classList.remove(this._inputErrorClass);
            errorElement.classList.remove(this._errorClass);
        } else {
            inputElement.classList.add(this._inputErrorClass);
            errorElement.classList.add(this._errorClass);
        }
        
    }

    _toggleButtonSubmit () {
        if (!this._form.checkValidity()) {
            this._buttonSubmit.classList.add(this._buttonSubmitInactive);
            this._buttonSubmit.setAttribute('disabled', '');
        } else {
            this._buttonSubmit.classList.remove(this._buttonSubmitInactive);
            this._buttonSubmit.removeAttribute('disabled');
        }
    }

    enableValidation () {
        this._form.setAttribute('novalidate', '');
        this._toggleButtonSubmit();
        this._setListeners();
    }
}