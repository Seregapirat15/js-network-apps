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

        // Products container
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

        // Initial render of products
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