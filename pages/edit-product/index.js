export class EditProductPage {
    constructor() {
        this.product = null;
        this.isNewProduct = true;
    }

    async fetchProduct(id) {
        if (!id) {
            this.isNewProduct = true;
            this.product = {
                name: '',
                price: '',
                category: '',
                description: '',
                image: '',
                details: ''
            };
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`);
            if (!response.ok) {
                throw new Error('Продукт не найден');
            }
            this.product = await response.json();
            this.isNewProduct = false;
        } catch (error) {
            console.error('Ошибка при получении продукта:', error);
            this.product = null;
        }
    }

    async saveProduct() {
        const form = document.getElementById('productForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const productData = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            description: formData.get('description'),
            image: formData.get('image'),
            details: formData.get('details')
        };

        try {
            let url = 'http://localhost:3001/api/products';
            let method = 'POST';

            if (!this.isNewProduct) {
                url = `${url}/${this.product.id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                // После успешного сохранения возвращаемся на главную страницу
                window.location.hash = '';
            } else {
                throw new Error('Ошибка при сохранении продукта');
            }
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            const errorAlert = document.getElementById('errorAlert');
            errorAlert.textContent = `Ошибка: ${error.message}`;
            errorAlert.classList.remove('d-none');
        }
    }

    async render(productId) {
        await this.fetchProduct(productId);
        const app = document.getElementById('app');

        app.innerHTML = `
            <div class="container">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h2 class="mb-0">
                            <i class="bi ${this.isNewProduct ? 'bi-plus-circle' : 'bi-pencil-square'} me-2"></i>
                            ${this.isNewProduct ? 'Добавление нового продукта' : 'Редактирование продукта'}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger d-none" id="errorAlert" role="alert"></div>
                        
                        <form id="productForm" class="needs-validation" novalidate>
                            <div class="mb-3">
                                <label for="name" class="form-label">Название</label>
                                <input type="text" class="form-control" id="name" name="name" value="${this.product?.name || ''}" required>
                                <div class="invalid-feedback">Пожалуйста, введите название продукта</div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="price" class="form-label">Цена</label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="price" name="price" step="0.01" min="0" value="${this.product?.price || ''}" required>
                                    <div class="invalid-feedback">Пожалуйста, введите корректную цену</div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="category" class="form-label">Категория</label>
                                <select class="form-select" id="category" name="category" required>
                                    <option value="" ${!this.product?.category ? 'selected' : ''}>Выберите категорию...</option>
                                    <option value="Electronics" ${this.product?.category === 'Electronics' ? 'selected' : ''}>Электроника</option>
                                    <option value="Audio" ${this.product?.category === 'Audio' ? 'selected' : ''}>Аудио</option>
                                    <option value="Gaming" ${this.product?.category === 'Gaming' ? 'selected' : ''}>Игры</option>
                                    <option value="Computers" ${this.product?.category === 'Computers' ? 'selected' : ''}>Компьютеры</option>
                                </select>
                                <div class="invalid-feedback">Пожалуйста, выберите категорию</div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="description" class="form-label">Описание</label>
                                <textarea class="form-control" id="description" name="description" rows="3">${this.product?.description || ''}</textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="image" class="form-label">URL изображения</label>
                                <input type="text" class="form-control" id="image" name="image" value="${this.product?.image || ''}">
                                <div class="form-text">Оставьте пустым для изображения по умолчанию</div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="details" class="form-label">Детали</label>
                                <textarea class="form-control" id="details" name="details" rows="3">${this.product?.details || ''}</textarea>
                            </div>
                            
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-primary" id="saveButton">
                                    <i class="bi bi-save me-1"></i> Сохранить
                                </button>
                                <button type="button" class="btn btn-secondary" id="cancelButton">
                                    <i class="bi bi-x-circle me-1"></i> Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // Добавляем обработчики событий
        document.getElementById('saveButton').addEventListener('click', () => this.saveProduct());
        document.getElementById('cancelButton').addEventListener('click', () => {
            window.location.hash = '';
        });
    }
} 