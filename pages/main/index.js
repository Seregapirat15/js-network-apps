import { createProductCard } from '../../components/product-card/index.js';

export class MainPage {
    constructor() {
        this.products = [
      {
        id: 1,
                name: "MacBook Pro",
                description: "High-performance laptop for professionals",
                price: 1299.99,
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"
      },
      {
        id: 2,
                name: "Iphone 15",
                description: "Latest smartphone with advanced features",
                price: 799.99,
                image: "https://avatars.mds.yandex.net/i?id=326fb1d566045e2168b621d69a6d31a7_l-5221896-images-thumbs&n=13"
      },
      {
        id: 3,
                name: "audiotechnica at-m50x",
                description: "Premium noise-canceling headphones",
                price: 749.99,
                image: "https://avatars.mds.yandex.net/i?id=65361de8a41e42222804d07db78f39eb_l-5235360-images-thumbs&n=13"
            },
            {
                id: 4,
                name: "iPad Pro",
                description: "Powerful tablet for creative professionals",
                price: 999.99,
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80"
            },
            {
                id: 5,
                name: "Apple Watch Series 8",
                description: "Advanced health monitoring and fitness tracking",
                price: 399.99,
                image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80"
            },
            {
                id: 6,
                name: "Sony WH-1000XM4",
                description: "Premium wireless noise-canceling headphones",
                price: 349.99,
                image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80"
            },
            {
                id: 7,
                name: "Dell XPS 13",
                description: "Ultra-portable premium laptop",
                price: 1199.99,
                image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80"
            },
            {
                id: 8,
                name: "AirPods Pro",
                description: "Wireless earbuds with active noise cancellation",
                price: 249.99,
                image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80"
            },
            {
                id: 9,
                name: "Gaming Mouse",
                description: "High-precision gaming mouse",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80"
            },
            {
                id: 10,
                name: "Mechanical Keyboard",
                description: "RGB mechanical gaming keyboard",
                price: 159.99,
                image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80"
            }
        ];
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.render(); // Re-render the page
    }

    addNewProduct() {
        const newProduct = { ...this.products[0] };
        newProduct.id = Math.max(...this.products.map(p => p.id)) + 1;
        this.products.push(newProduct);
        this.render();
    }

    filterProducts(searchTerm) {
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    createCarousel() {
        const carousel = document.createElement('div');
        carousel.className = 'carousel slide mb-4';
        carousel.id = 'productCarousel';
        carousel.setAttribute('data-bs-ride', 'carousel');
        carousel.setAttribute('data-bs-interval', '3000'); // Интервал автопрокрутки в миллисекундах

        // Создаем индикаторы
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        // Создаем слайды
        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        // Группируем продукты по 3 в слайде
        const productsPerSlide = 3;
        const slides = [];
        
        for (let i = 0; i < this.products.length; i += productsPerSlide) {
            slides.push(this.products.slice(i, i + productsPerSlide));
        }

        slides.forEach((slideProducts, index) => {
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
            
            const slideContent = document.createElement('div');
            slideContent.className = 'd-flex justify-content-around align-items-center';
            slideContent.style.minHeight = '450px';
            slideContent.style.padding = '20px';

            slideProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'card h-100';
                productCard.style.width = '18rem';
                productCard.style.margin = '0 10px';
                productCard.innerHTML = `
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <p class="card-text"><strong>$${product.price}</strong></p>
                        <a href="#product/${product.id}" class="btn btn-primary mt-auto">View Details</a>
                    </div>
                `;
                slideContent.appendChild(productCard);
            });

            slide.appendChild(slideContent);
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

        // Инициализация карусели после добавления в DOM
        setTimeout(() => {
            new bootstrap.Carousel(carousel, {
                interval: 3000,
                ride: 'carousel',
                wrap: true
            });
        }, 0);

        return carousel;
    }

  render() {
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