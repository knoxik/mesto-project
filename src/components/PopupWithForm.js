import { Popup } from './Popup.js';
import { validateConfig } from '../utils/constants.js';

export class PopupWithForm extends Popup{
    constructor (popupSelector, formSubmitCallback) {
        super (popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this.formEl = this._popupSelector.querySelector(validateConfig.formSelector);
        this._submitButton = this._popupSelector.querySelector(validateConfig.submitButtonSelector);
        this._inputList = this.formEl.querySelectorAll(validateConfig.inputSelector);
    }

    _getInputValues () {
        this._inputValues = {};
        this._inputList.forEach( input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners () {
        super.setEventListeners();
        this.formEl.addEventListener('submit',this._formSubmitCallback);
    }

    close () {
        super.close();
        this.formEl.removeEventListener('submit',  this._formSubmitCallback);
        this._submitButton.setAttribute('disabled', '');
        this._submitButton.classList.add(validateConfig.inactiveButtonClass);
        this.formEl.reset();
        this._inputList.forEach(input => {
            input.classList.remove(validateConfig.inputErrorClass);
            this.formEl.querySelector(`.${input.id}-error`).classList.remove(validateConfig.errorClass);
        })
    }
}
