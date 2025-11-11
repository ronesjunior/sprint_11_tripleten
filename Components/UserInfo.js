export default class Userinfo {
  constructor(nameSelector, jobSelector) {
    this._nameElement = document.querySelector(nameSelector); // cria uma variável que pega toda a div HTML 'profile__title'
    this._jobElement = document.querySelector(jobSelector); // cria uma variável que pega toda a div HTML 'profile__description'
  }
  getUserInfo() {
    // Esse método retorna um objeto array com duas propriedades: name e job
    // exemplo: {name: "Jacques Cousteau", job: "Explorador"}
    return {
      name: this._nameElement.textContent, // pega somente o texto dentro da div HTML 'profile__title'
      job: this._jobElement.textContent, // pega somente o texto dentro da div HTML 'profile__description'
    }; // retorna um array com a chave 'name' com o valor do 'profile__title' e 'job' com o valor do 'profile__description'
  }

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
