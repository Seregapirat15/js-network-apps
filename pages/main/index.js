import { ProductCardComponent } from "../../components/product-card/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent; // Родительский элемент (например, document.getElementById("app"))
  }

  // Геттер для доступа к контейнеру карточек
  get pageRoot() {
    return document.getElementById('main-page');
  }

  // Метод для получения данных (теперь возвращает массив)
  clickCard(e) {
    const cardId = e.target.dataset.id; // Получаем ID из data-атрибута
    console.log(`Кликнули на карточку с ID: ${cardId}`);
    // Здесь можно добавить логику (например, открыть детали товара)
  }
  getData() {
    return [
      {
        id: 1,
        src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
        title: "Акция 1",
        text: "Такой акции вы еще не видели 1"
      },
      {
        id: 2,
        src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
        title: "Акция 2",
        text: "Такой акции вы еще не видели 2"
      },
      {
        id: 3,
        src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
        title: "Акция 3",
        text: "Такой акции вы еще не видели 3"
      }
    ];
  }

  // Метод для генерации HTML-разметки страницы
  getHTML() {
    return `
      <div id="main-page" class="d-flex flex-wrap gap-3 p-3"></div>
    `;
  }

  // Главный метод рендеринга
  render() {
    this.parent.innerHTML = ''; // Очищаем контейнер
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html); // Вставляем разметку

    const data = this.getData(); // Получаем массив данных
    data.forEach(item => {
      const productCard = new ProductCardComponent(this.pageRoot); // Создаем карточку
      productCard.render(item); // Рендерим с данными
    });
  }
}