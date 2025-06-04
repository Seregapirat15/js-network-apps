export class SpecificationsPage {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "MacBook Pro",
                specifications: {
                    processor: "Apple M2 Pro/Max",
                    ram: "Up to 96GB unified memory",
                    storage: "Up to 8TB SSD",
                    display: "14.2-inch or 16.2-inch Liquid Retina XDR display",
                    battery: "Up to 22 hours",
                    ports: ["3x Thunderbolt 4", "HDMI", "SDXC card slot", "MagSafe 3"],
                    weight: "1.61 kg (14-inch) / 2.15 kg (16-inch)",
                    dimensions: "1.55 x 31.26 x 22.12 cm",
                    os: "macOS Ventura"
                }
            },
            {
                id: 2,
                name: "Iphone 15",
                specifications: {
                    processor: "A16 Bionic chip",
                    ram: "6GB",
                    storage: "128GB/256GB/512GB",
                    display: "6.1-inch Super Retina XDR OLED",
                    battery: "3349 mAh",
                    camera: "48MP main + 12MP ultra-wide",
                    biometrics: "Face ID",
                    weight: "171g",
                    dimensions: "147.6 x 71.6 x 7.8 mm",
                    os: "iOS 17"
                }
            },
            {
                id: 3,
                name: "audiotechnica at-m50x",
                specifications: {
                    type: "Closed-back dynamic",
                    driver: "45mm",
                    frequency: "15-28,000 Hz",
                    impedance: "38 ohms",
                    sensitivity: "98 dB",
                    cable: "Detachable 1.2m-3m coiled and straight cables",
                    weight: "285g",
                    connector: "3.5mm with 6.3mm adapter",
                    foldable: "Yes",
                    padding: "Professional-grade earpad and headband"
                }
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
                    Product specifications not found!
                </div>
            `;
            return;
        }

        const specs = product.specifications;
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
                    <h2 class="mb-0">${product.name} - Technical Specifications</h2>
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