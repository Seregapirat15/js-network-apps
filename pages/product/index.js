export class ProductPage {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "MacBook Pro",
                description: "High-performance laptop for professionals",
                price: 1299.99,
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
                details: "15.6-inch 4K display, Intel Core i9, 32GB RAM, 1TB SSD"
            },
            {
                id: 2,
                name: "Iphone 15",
                description: "Latest smartphone with advanced features",
                price: 799.99,
                image: "https://avatars.mds.yandex.net/i?id=326fb1d566045e2168b621d69a6d31a7_l-5221896-images-thumbs&n=13",
                details: "6.7-inch OLED display, 5G capable, 256GB storage"
            },
            {
                id: 3,
                name: "audiotechnica at-m50x",
                description: "Premium noise-canceling headphones",
                price: 749.99,
                image: "https://avatars.mds.yandex.net/i?id=65361de8a41e42222804d07db78f39eb_l-5235360-images-thumbs&n=13",
                details: "40-hour battery life, Active Noise Cancellation, Bluetooth 5.0"
            }
        ];
    }

    getProduct(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    render(productId) {
        const app = document.getElementById('app');
        const product = this.getProduct(productId);

        if (!product) {
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
                        <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title">${product.name}</h2>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><small class="text-muted">${product.details}</small></p>
                            <p class="card-text"><strong>Price: $${product.price}</strong></p>
                            <button class="btn btn-primary" id="backButton">Back to Products</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listener for back button
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.hash = '';
        });
    }
}