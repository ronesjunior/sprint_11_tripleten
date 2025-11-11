export default class Card {
  constructor(
    { name, link }, // items
    templateSelector, // .elements
    handleImageClick, // constante imagePopup que instancia PopupWithImage(".popup-img");
    handleDeleteCard // constante excluir_card em utils.js
  ) {
    // Guarda os dados do card
    // .this = new Card(item.name, item.link, ".elements", openPopup_img);
    this._name = name; // propriedade que recebe o nome da imagem / título do card
    this._link = link; // propriedade que recebe o link da imagem

    // Guarda o seletor do template que será usado para criar o card
    this._templateSelector = templateSelector; // propriedade que recebe a classe .elements do HTML

    // constante imagePopup que instancia PopupWithImage(".popup-img");
    this._handleImageClick = handleImageClick;

    // função externa para deletar o card
    this._handleDeleteCard = handleDeleteCard; // propriedade que recebe a função excluir_card do utils.js
  }

  // Método para pegar e clonar o template
  _getTemplate() {
    // 1. Seleciona o template no HTML usando o seletor (class='elements')
    const template = document.querySelector(this._templateSelector).content;

    // 2. Clona o elemento do template (true = clona todos os filhos ou seja toda a class .element que fica dentro da classe .elements)
    const cardElement = template.querySelector(".element").cloneNode(true);
    // 3. Retorna o elemento clonado pronto para ser preenchido
    return cardElement;
  }

  // Configura todos os listeners do card
  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like-button");
    const deleteButton = this._element.querySelector(".element__lixeira-icon");
    const cardImage = this._element.querySelector(".element__image");

    // Clique no botão de like → alterna classe
    likeButton.addEventListener("click", () => {
      const icon = likeButton.querySelector(".element__like-icon");
      icon.classList.toggle("element__like-icon_active");
      console.log("like");
    });

    // Clique no botão da lixeira → exclui card
    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._element); // Chama a função excluir_card do utils.js e atibui o this._element (toda a class .element)
    });

    cardImage.addEventListener("click", () => {
      this._handleImageClick.open({
        alt: this._name,
        src: this._link,
        caption: this._name,
      });
    });
  }

  // Preenche os dados do card
  generateCard() {
    // .this é o objeto card criado instanciado com todos os dados item.name,item.link... ou seja, é o new card criado
    this._element = this._getTemplate(); // nova propriedade this._element criada que recebe o clone de todo o template (<div> com a classe .element)
    // this (Card) = primeira interação (criou-se nova propriedade this._element)
    // this._element abaixo:
    // <div class="element">
    //     <button class="element__delete-button" type="button" aria-label="Excluir cartão">
    //       <img src="./images/lixeira.png" alt="botão lixeira" class="element__lixeira-icon">
    //     </button>
    //     <img class="element__image" src="https://.jpg" alt="texto">
    //     <div class="element__description">
    //       <h2 class="element__title">Latemar</h2>
    //       <button class="element__like-button" type="button" aria-label="Curtir">
    //         <img src="./images/like_button.svg" alt="botão like" class="element__like-icon">
    //       </button>
    //     </div>
    //  </div>
    this._element.querySelector(".element__title").textContent = this._name; //A propriedade criada _element recebe o título (item.name) dentro da <div class="element__title">
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._setEventListeners(); // chama o método para abrir popup inserir cartão, excluir card e curtir imagem
    return this._element; // generateCard() retorna com o objeto instanciado com as propriedades
  }
}

///////////////////////////////////////
