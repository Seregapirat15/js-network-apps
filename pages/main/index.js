import { createProductCard } from '../../components/product-card/index.js';

export class MainPage {
    constructor() {
        this.products = [];
    }

    async fetchProducts() {
        try {
            const response = await fetch('http://localhost:3001/api/products');
            this.products = await response.json();
            return this.products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async deleteProduct(id) {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.products = this.products.filter(p => p.id !== id);
                this.render(); // Re-render the page
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async addNewProduct() {
        try {
            const newProduct = {
                name: "New Product",
                price: 99.99,
                category: "Electronics",
                description: "New product description",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"
            };

            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                const addedProduct = await response.json();
                this.products.push(addedProduct);
                this.render();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    filterProducts(searchTerm) {
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    createCarousel() {
        const carousel = document.createElement('div');
        carousel.className = 'carousel slide mb-4';
        carousel.id = 'productCarousel';
        carousel.setAttribute('data-bs-ride', 'carousel');
        carousel.setAttribute('data-bs-interval', '3000');

        // Создаем индикаторы
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        // Создаем слайды
        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        // Создаем слайд для каждого продукта
        this.products.forEach((product, index) => {
            // Индикатор
            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('data-bs-target', '#productCarousel');
            button.setAttribute('data-bs-slide-to', index.toString());
            button.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) {
                button.className = 'active';
                button.setAttribute('aria-current', 'true');
            }
            indicators.appendChild(button);

            // Слайд
            const slide = document.createElement('div');
            slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            
            // Контейнер для изображения и названия
            const slideContent = document.createElement('div');
            slideContent.className = 'position-relative mx-auto';
            slideContent.style.height = '400px'; // Уменьшаем высоту
            slideContent.style.maxWidth = '800px'; // Ограничиваем максимальную ширину

            // Изображение
            const image = document.createElement('img');
            image.src = product.image || 'https://via.placeholder.com/800x400';
            image.className = 'w-100 h-100';
            image.style.objectFit = 'cover';
            image.style.borderRadius = '8px'; // Добавляем скругление углов
            image.alt = product.name;

            // Оверлей с названием
            const overlay = document.createElement('div');
            overlay.className = 'position-absolute bottom-0 w-100 p-4';
            overlay.style.background = 'linear-gradient(transparent, rgba(0,0,0,0.8))';
            overlay.style.borderRadius = '0 0 8px 8px'; // Скругление для оверлея
            
            const productName = document.createElement('h2');
            productName.className = 'text-white mb-0';
            productName.textContent = product.name;
            
            overlay.appendChild(productName);
            slideContent.appendChild(image);
            slideContent.appendChild(overlay);
            
            // Добавляем ссылку на страницу продукта
            const link = document.createElement('a');
            link.href = `#product/${product.id}`;
            link.style.textDecoration = 'none';
            link.appendChild(slideContent);
            
            slide.appendChild(link);
            carouselInner.appendChild(slide);
        });

        // Добавляем кнопки навигации
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-control-prev';
        prevButton.setAttribute('type', 'button');
        prevButton.setAttribute('data-bs-target', '#productCarousel');
        prevButton.setAttribute('data-bs-slide', 'prev');
        prevButton.innerHTML = `
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        `;

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-control-next';
        nextButton.setAttribute('type', 'button');
        nextButton.setAttribute('data-bs-target', '#productCarousel');
        nextButton.setAttribute('data-bs-slide', 'next');
        nextButton.innerHTML = `
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        `;

        carousel.appendChild(indicators);
        carousel.appendChild(carouselInner);
        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);

        return carousel;
    }

    async render() {
        await this.fetchProducts();
        const app = document.getElementById('app');
        app.innerHTML = '';

        // Search and Add Product controls
        const controls = document.createElement('div');
        controls.className = 'mb-4';
        controls.innerHTML = `
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" id="searchInput" placeholder="Search products...">
                </div>
                <div class="col-auto">
                    <button class="btn btn-success" id="addProductBtn">Add New Product</button>
                </div>
            </div>
        `;
        app.appendChild(controls);

        // Add carousel
        app.appendChild(this.createCarousel());

        // Products grid container
        const gridTitle = document.createElement('h3');
        gridTitle.className = 'mb-3';
        gridTitle.textContent = 'All Products';
        app.appendChild(gridTitle);

        const productsContainer = document.createElement('div');
        productsContainer.className = 'row row-cols-1 row-cols-md-3 g-4';
        app.appendChild(productsContainer);

        // Add event listeners
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const filteredProducts = this.filterProducts(e.target.value);
            this.renderProducts(filteredProducts);
        });

        const addBtn = document.getElementById('addProductBtn');
        addBtn.addEventListener('click', () => this.addNewProduct());

        // Initial render of products grid
        this.renderProducts(this.products);
    }

    renderProducts(products) {
        const container = document.querySelector('.row-cols-md-3');
        container.innerHTML = '';
        
        products.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col';
            col.appendChild(createProductCard(product, (id) => this.deleteProduct(id)));
            container.appendChild(col);
        });
    }
}