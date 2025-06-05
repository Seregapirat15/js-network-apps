export class SpecificationsPage {
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

    generateSpecifications(product) {
        // Создаем спецификации на основе категории продукта
        let specs = {};
        
        if (product.category === 'Electronics' || product.category === 'Audio') {
            specs = {
                name: product.name,
                price: `$${product.price}`,
                category: product.category,
                description: product.description || 'Not specified',
                details: product.details || 'Not specified'
            };
            
            // Добавляем дополнительные спецификации в зависимости от названия продукта
            if (product.name.includes('MacBook') || product.name.includes('Laptop')) {
                specs.processor = 'Apple M2 Pro/Max';
                specs.ram = 'Up to 96GB unified memory';
                specs.storage = 'Up to 8TB SSD';
                specs.display = '14.2-inch or 16.2-inch Liquid Retina XDR display';
                specs.battery = 'Up to 22 hours';
            } else if (product.name.includes('iPhone') || product.name.includes('Phone')) {
                specs.processor = 'A16 Bionic chip';
                specs.ram = '6GB';
                specs.storage = '128GB/256GB/512GB';
                specs.display = '6.1-inch Super Retina XDR OLED';
                specs.battery = '3349 mAh';
                specs.camera = '48MP main + 12MP ultra-wide';
            } else if (product.name.includes('Audio-Technica') || product.name.includes('Headphones')) {
                specs.type = 'Closed-back dynamic';
                specs.driver = '45mm';
                specs.frequency = '15-28,000 Hz';
                specs.impedance = '38 ohms';
                specs.sensitivity = '98 dB';
            }
        } else {
            // Для других категорий
            specs = {
                name: product.name,
                price: `$${product.price}`,
                category: product.category,
                description: product.description || 'Not specified'
            };
        }
        
        return specs;
    }

    async render(productId) {
        await this.fetchProduct(productId);
        const app = document.getElementById('app');

        if (!this.product) {
            app.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Product specifications not found!
                </div>
            `;
            return;
        }

        const specs = this.generateSpecifications(this.product);
        const specsList = Object.entries(specs)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return `
                        <div class="row mb-2">
                            <div class="col-4 fw-bold text-capitalize">${key}:</div>
                            <div class="col-8">${value.join(', ')}</div>
                        </div>
                    `;
                }
                return `
                    <div class="row mb-2">
                        <div class="col-4 fw-bold text-capitalize">${key}:</div>
                        <div class="col-8">${value}</div>
                    </div>
                `;
            }).join('');

        app.innerHTML = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h2 class="mb-0">${this.product.name} - Technical Specifications</h2>
                </div>
                <div class="card-body">
                    ${specsList}
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary" id="backButton">Back to Product</button>
                </div>
            </div>
        `;

        // Add event listener for back button
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.hash = `#product/${productId}`;
        });
    }
} 