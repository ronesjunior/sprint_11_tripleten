// utils.js
// utils.js → dados, constantes e funções

// ARRAY PRINCIPAL COM DOIS OBJETOS PARA EXPOR OS CARDS

export const initialCards = [
  // array com vários objetos chave + valor
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/////////////////////////////////////////////////////////////////////////////////////////////////

import Card from "../Components/Card.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import { section, userInfo } from "./index.js";

const popupImage = document.querySelector(".popup-img");
const popupClose = popupImage.querySelector(".popup-img__close");

const imagePopup = new PopupWithImage(".popup-img");

export function closePopup_img() {
  popupImage.classList.remove("popup-img__opened_img");
}

// Evento de fechar
popupClose.addEventListener("click", closePopup_img);

// Função para excluir cards
export const excluir_card = (element) => {
  // recebe a classe .element selecionada com click pelo deleteButton.addEventListener do método _setEventListeners dentro da class card em card.js
  element.remove();
};

// FUNÇÃO PARA RENDERIZAR CARDS AUTOMÁTICO
export function renderizarCard({ name, link }) {
  const card = new Card({ name, link }, ".elements", imagePopup, excluir_card);
  return card.generateCard();
}
/////////////////////////////////////////////////////////////////////
// Função para coletar os dados quando o usuário enviar o forms PERFIL e atualizar

export function handleProfileSubmit({ nome, sobre }) {
  // Atualiza o perfil na página
  userInfo.setUserInfo(nome, sobre);
}
///////////////////////////////////////////////////////////////////
// Função para coletar os dados quando o usuário enviar o forms ADICIONAR CARD e atualizar

export function handleCardSubmit(formData) {
  //formData é o array formado na classe 'popuwithforms' com o método  _getInputValues(). O array com chave e valor é o 'inputValues'
  const novoCard = new Card( // criação do objeto novocard a partida da classe Card
    { name: formData.titulo, link: formData.link },
    ".elements",
    imagePopup,
    excluir_card
  );
  // Gerar o elemento HTML do cartão
  section.addItem(novoCard.generateCard()); // section é um objeto criado a partir da classe Section
  //  classe Section existe o método addItem que vai receber o objeto novoCard que executa o método .generateCard() e que vai estar instanciado com todas as propriedades do card
}
/////////////////////////////////////////////////////////////////////
