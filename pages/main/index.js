import { createProductCard } from '../../components/product-card/index.js';

export class MainPage {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "Laptop Pro",
                description: "High-performance laptop for professionals",
                price: 1299.99,
                image: "https://picsum.photos/300/200?random=1"
            },
            {
                id: 2,
                name: "Smartphone X",
                description: "Latest smartphone with advanced features",
                price: 799.99,
                image: "https://picsum.photos/300/200?random=2"
            },
            {
                id: 3,
                name: "Wireless Headphones",
                description: "Premium noise-canceling headphones",
                price: 249.99,
                image: "https://picsum.photos/300/200?random=3"
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