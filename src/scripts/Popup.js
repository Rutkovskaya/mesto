class Popup {
    constructor(popupSelector) {
        this._selector = popupSelector;
    }

    open () {
        this._selector.classList.add("popup_opened");
        this.setEventListeners();
    }


    close () {
        this._selector.classList.remove("popup_opened");
        this.removeListeners();
    };

    setEventListeners ()  {
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close()
            }
            if (evt.target.classList.contains('popup__close-btn')) {
                this.close()
            };
        });
        document.addEventListener("keydown", this._handleEscClose);
        };


    removeListeners () {
        this._selector.querySelector(".popup__close-btn")
        this._selector.removeEventListener("click", this.close);
        document.removeEventListener("keydown", this._handleEscClose);
    };

    _handleEscClose (event) {
        if (event.key === "Escape") {
            this.close();
        }
    };
}
export {Popup}