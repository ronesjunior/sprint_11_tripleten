import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  // Isso significa que PopupWithImage herda tudo que a classe Popup tem: atributos e métodos públicos/protegidos.
  constructor(popupSelector) {
    // popupSelector é o nome do argumento recebido da instânica criada = ".popup-image"
    super(popupSelector); // chama o construtor da classe pai "Popup" e faz existir o "this._popup". Sem super(), não dá para usar this
    this._popupImg = this._popup.querySelector(".popup-img__image");
    this._popupCaption = this._popup.querySelector(".popup-img__caption");
  }

  open({ src, alt, caption }) {
    this._popupImg.src = src;
    this._popupImg.alt = alt;
    this._popupCaption.textContent = caption;

    super.open(); // chama o método open() da classe Popup
  }
}
