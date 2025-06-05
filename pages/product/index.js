export class ProductPage {
    constructor() {
        this.product = null;
    }

    async fetchProduct(id) {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            this.product = await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            this.product = null;
        }
    }

    async render(productId) {
        await this.fetchProduct(productId);
        const app = document.getElementById('app');

        if (!this.product) {
            app.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Product not found!
                </div>
            `;
            return;
        }

        app.innerHTML = `
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${this.product.image || 'https://via.placeholder.com/400x300'}" 
                             class="img-fluid rounded-start" 
                             alt="${this.product.name}"
                             style="height: 300px; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title">${this.product.name}</h2>
                            <p class="card-text">${this.product.description || this.product.category}</p>
                            <p class="card-text"><small class="text-muted">${this.product.details || 'No additional details available'}</small></p>
                            <p class="card-text"><strong>Price: $${this.product.price}</strong></p>
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary" id="backButton">Back to Products</button>
                                <button class="btn btn-info text-white" id="specsButton">Specifications</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.hash = '';
        });

        document.getElementById('specsButton').addEventListener('click', () => {
            window.location.hash = `#specifications/${productId}`;
        });
    }
}