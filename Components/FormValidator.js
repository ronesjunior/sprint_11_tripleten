export default class FormValidator {
  constructor(config, formElement) {
    // Guarda 2 parêmetro: seletores e classes de formulários + elemento de formulário para ser validado
    this._config = config; // configuração de seletores e classes de formulários
    this._formElement = formElement; // elemento de formulário para ser validado+
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    // console.log(config);
  }

  // Método público para ativar a validação
  enableValidation() {
    this._setEventListeners();
  }

  // Checa se o input é válido e mostra/oculta o erro
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    // console.log(errorElement);
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.errorClass);
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
    }
  }

  // Ativa ou desativa o botão
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  // Verifica se algum input é inválido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Adiciona listeners em todos os inputs
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  isValid() {
    return !this._hasInvalidInput();
  }

  resetValidation() {
    // Limpa todos os erros visuais
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      errorElement.textContent = "";
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
    });

    // Reseta o estado do botão
    this._toggleButtonState();
  }
}
