import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // a classe PopupWithForm herda tudo da classe Popup, métodos e propriedades
  constructor(
    popupSelector,
    handleFormSubmit,
    formSelector,
    inputSelector,
    validator
  ) {
    super(popupSelector); // Isso faz com que o construtor da classe pai (Popup) seja executado. Ou seja, o this._popup recebe 'popup' ou 'popup-add-card'
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll(inputSelector);
    this._validator = validator;
  }

  _getInputValues() {
    const inputValues = {}; // array vazio que receberá todos os input.name formando um array com os atributos digitados nos campos dos popup
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value; //input.name seria o atributo ou nome do campo, ex: name='titulo' e name='link' do popup-add-card__form
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      // quando o usuário clicar no botão do formulário, executa a função this._handleFormSubmit
      evt.preventDefault();

      if (!this._form.checkValidity()) {
        return; // Não envia se inválido
      }

      this._handleFormSubmit(this._getInputValues()); // a função this._handleFormSubmit recebe o array inputValues gerado pelo método público this._getInputValues()
      // console.log(this._getInputValues());
      super.close(); // // executa o método this.close() hercado da classe pai de 'popuwithform', chamada 'popup'
      this._form.reset();
      this._validator.resetValidation(); // Reseta a validação
    });
  }

  close() {
    // Chama o método da classe pai + reseta o formulário
    super.close(); //"Chame o método close() que existe na classe pai (Popup) antes de continuar o código da classe filha (PopupWithForm)."
    this._form.reset();
    if (this._validator) {
      this._validator.resetValidation(); // Reseta a validação quando fechar
    }
  }
}
