export class Popup{
    constructor (popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleMouseDown = this._handleMouseDown.bind(this);
    }

    open () {
        this.setEventListeners();
        this._popupSelector.classList.add('popup_opened');
    }

    close () {
        this._popupSelector.classList.remove('popup_opened');
        this._popupSelector.removeEventListener('mousedown', this._handleMouseDown);
        document.removeEventListener('keydown',this._handleEscClose);
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape'){
            this.close(this._popupSelector);
        }
    }

    _handleMouseDown (evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')){
            this.close(this.popupSelector);
        }
    }

    setEventListeners () {
        this._popupSelector.addEventListener('mousedown', this._handleMouseDown);
        document.addEventListener('keydown', this._handleEscClose);
    }
}
