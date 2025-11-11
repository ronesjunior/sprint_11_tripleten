export default class Popup {
  constructor(popupSelector) {
    // popupSelector pode ser '#popup-add-card' ou '.popup' ou ".popup-img".
    this._popup = document.querySelector(popupSelector); // this._popup recebe a classe '#popup-add-card' ou '.popup' ou ".popup-img". PopupSelector é a classe pai do popup
    // bind para manter o "this" da classe dentro da função, ou seja, garantir que o 'this' sempre será a nstância do popuup
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.style.display = "flex";
    this._popup.classList.add("popup-img__opened_img");
    // Adiciona o evento quando o popup é aberto quando clicando em ESC
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.style.display = "none";
    this._popup.classList.remove("popup-img__opened_img");
    // Remove o evento clicando em ESC quando o popup é fechado
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Fechar clicando no botão X
    this._popup.querySelector("[data-fechar]").addEventListener("click", () => {
      this.close();
    });

    // Fechar clicando na overlay (área escura)
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
