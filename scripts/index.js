// index.js → apenas lógica de inicialização

import {
  renderizarCard,
  handleCardSubmit,
  handleProfileSubmit,
} from "./utils.js";
import FormValidator from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import PopupWithForm from "../Components/PopupWithForms.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import Userinfo from "../Components/UserInfo.js";
import { initialCards } from "./utils.js";

/// ARRAYS PARA VALIDAÇÃO DOS CAMPOS DOS FORMULÁRIOS PERFIL E ADD CARD

const configAdd = {
  popupSelector: "#popup-add-card",
  formSelector: "#popup-add-card__form",
  inputSelector: ".popup-add-card__entrada",
  submitButtonSelector: ".popup-add-card__criar-botao",
  inactiveButtonClass: "popup-add-card__criar-botao_inativo",
  inputErrorClass: "popup-add-card__entrada_tipo_erro",
  errorClass: "popup-add-card__entrada-error_ativo",
};

const configPerfil = {
  popupSelector: "#popup",
  formSelector: "#popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: "#popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
///////////////////////////////////////////////////////////////////////////////////////////////////
// RENDERIZAR OS CARDS COM DESCONSTRUÇÃO

const formAddcard = document.querySelector("#popup-add-card__form");
const formAddperfil = document.querySelector("#popup__form");

// Criar as instâncias para a validação
const formValidatorAddcard = new FormValidator(configAdd, formAddcard); // cria um objeto para validar as configurações para adicionar cartão
const formValidatorAddperfil = new FormValidator(configPerfil, formAddperfil); // cria um objeto para validar as configurações para alterar o perfil

formValidatorAddcard.enableValidation();
formValidatorAddperfil.enableValidation();

/// começa aqui, renderizar todos os 6 cards na tela automático e criar novos cards
// cria um novo objeto a partir do molde/classe Section e grava na variável section
const section = new Section(
  { items: initialCards, renderer: renderizarCard },
  ".elements-container" // container <div> onde inserir toda a estrutura dos cartões
);

section.renderItems(); // pega a variável section criada anteriormente que guarda o objeto criado a partir da classe section e aplica o método renderItems

export { section };
//////////////////////////////////////////////////////////////////////////////////
// CRIANDO UMA INSTÂNCIA PARA CADA POPUP (ADICIONAR CARD E IMAGEM)

// Para o popup de adicionar card
const createtButton = document.querySelector(".profile__add-button");

const addCardPopup = new PopupWithForm(
  "#popup-add-card",
  handleCardSubmit,
  ".popup-add-card__form",
  ".popup-add-card__entrada",
  formValidatorAddcard
);

addCardPopup.setEventListeners();

createtButton.addEventListener("click", () => {
  addCardPopup.open(); // executa o método this.open() onde a classe 'popuwithform' herdou da classe 'popup'
  //addCardPopup é uma instância da classe 'PopupWithForm', que herda tudo da classe 'Popup's
});

///////////////////////////////////////////////////////////////////////////////////
// Para o popup de imagem
const popupImg = new PopupWithImage(".popup-img"); // cria uma instância chamada popupImg. PopupWithImage é o nome da classe e .popup-img é o argumento que será passado para a classe PopupWithImage

// Adiciona os event listeners (fechar com X, overlay, ESC)
popupImg.setEventListeners();

// Abrir a imagem ao clicar em uma miniatura
document.querySelectorAll(".element__image").forEach((imgThumb) => {
  imgThumb.addEventListener("click", () => {
    popupImg.open({
      src: imgThumb.src,
      alt: imgThumb.alt,
      caption: imgThumb.alt, //
    });
  });
});
//////////////////////////////////////////////////////////////////////////
// Exibir os dados do usuário (nome e sobre) no formulário aberto
export const userInfo = new Userinfo(
  ".profile__title",
  ".profile__description"
);
const editButton = document.querySelector(".profile__square");

const editProfilePopup = new PopupWithForm(
  "#popup",
  handleProfileSubmit,
  ".popup__form",
  ".popup__input",
  formValidatorAddperfil
);

editProfilePopup.setEventListeners();

// Função para abrir o popup de edição (isso deve estar em uma função)
function openEditProfilePopup() {
  const { name, job } = userInfo.getUserInfo(); // desestruturação de objeto. Permite extrair propriedades de um objeto em variáveis separadas.
  // name recebe o valor de obj.name → "Jacques Cousteau" e job recebe o valor de obj.job → "Explorador".

  // const data = userInfo.getUserInfo(); // guardando em uma variável ,faz a mesma coisa que a desestruturação acima

  const nameInput = document.querySelector("#nome"); // cria uma variável que arquiva toda a div input com a id #nome
  const jobInput = document.querySelector("#sobre"); // cria uma variável que arquiva toda a div input com a id #sobre

  nameInput.value = name;
  jobInput.value = job;

  // nameInput.value = data.name; // usando o método de guardar em variável ao invés do método de desestruturação
  // jobInput.value = data.job;
}

// Event listener para o botão de editar
editButton.addEventListener("click", () => {
  editProfilePopup.open(); // abre o popup
  openEditProfilePopup(); // executa a função de abrir e preencher o popup
});
/////////////////////////////////////////////////////////////////////////
