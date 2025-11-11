export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // array initialCards com a chave name e o valor link
    this._renderer = renderer; // função rendercriaCard
    this._container = document.querySelector(containerSelector); // class .elements-container que vai receber toda a classe .elements
  }

  renderItems() {
    this._items.forEach((item) => {
      // percorrendo o array initialcards (this._items) e que cada (item) é um objeto (name e link) do array
      const element = this._renderer(item); // chama a função rendercriaCard, passa o name e link do array initialcards para renderizar o card e grava no variável element
      this._container.appendChild(element); // renderiza o card ao container criando toda a estrutura <div></div> para cada card
      // console.log(this._container);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
