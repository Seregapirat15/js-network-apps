export class ProductPage {
    constructor() {
        this.product = null;
    }

    async fetchProduct(id) {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`);
            if (!response.ok) {
                throw new Error('Продукт не найден');
            }
            this.product = await response.json();
        } catch (error) {
            console.error('Ошибка при получении продукта:', error);
            this.product = null;
        }
    }

    async render(productId) {
        await this.fetchProduct(productId);
        const app = document.getElementById('app');

        if (!this.product) {
            app.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Продукт не найден!
                </div>
            `;
            return;
        }

        app.innerHTML = `
            <div class="card shadow">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${this.product.image || 'https://via.placeholder.com/400x300'}" 
                             class="img-fluid rounded-start" 
                             alt="${this.product.name}"
                             style="height: 300px; width: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title">${this.product.name}</h2>
                            <p class="card-text">${this.product.description || this.product.category}</p>
                            <p class="card-text"><small class="text-muted">${this.product.details || 'Дополнительная информация отсутствует'}</small></p>
                            <p class="card-text"><strong>Цена: $${this.product.price}</strong></p>
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary" id="backButton">
                                    <i class="bi bi-arrow-left me-1"></i> Назад
                                </button>
                                <button class="btn btn-warning" id="editButton">
                                    <i class="bi bi-pencil me-1"></i> Редактировать
                                </button>
                                <button class="btn btn-info text-white" id="specsButton">
                                    <i class="bi bi-list-check me-1"></i> Характеристики
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Добавляем обработчики событий
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.hash = '';
        });

        document.getElementById('editButton').addEventListener('click', () => {
            window.location.hash = `#edit/${productId}`;
        });

        document.getElementById('specsButton').addEventListener('click', () => {
            window.location.hash = `#specifications/${productId}`;
        });
    }
}