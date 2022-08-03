import { Popup } from './Popup.js';
import { validateConfig } from './index.js';

export class PopupWithForm extends Popup{
    constructor (popupSelector, formSubmitCallback) {
        super (popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this._formEl = this._popupSelector.querySelector(validateConfig.formSelector);
        this._submitButton = this._popupSelector.querySelector(validateConfig.submitButtonSelector);
        this._inputList = this._formEl.querySelectorAll(validateConfig.inputSelector);
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
        this._formEl.addEventListeners('submit',this._formSubmitCallback);
    }

    close () {
        super.close();
        this._submitButton.setAttribute('disabled', '');
        this._submitButton.classList.add(validateConfig.inactiveButtonClass);
        this._formEl.reset();
        this._inputList.forEach(input => {
            input.classList.remove(validateConfig.inputErrorClass);
            this._formEl.querySelector(`.${input.id}-error`).classList.remove(validateConfig.errorClass);
        })
    }
}