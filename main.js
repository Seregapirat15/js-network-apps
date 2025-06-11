import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';
import { SpecificationsPage } from './pages/specifications/index.js';
import { EditProductPage } from './pages/edit-product/index.js';

class Router {
    constructor() {
        this.mainPage = new MainPage();
        this.productPage = new ProductPage();
        this.specificationsPage = new SpecificationsPage();
        this.editProductPage = new EditProductPage();
        
        // Initialize routing
        this.handleRoute();
        window.addEventListener('hashchange', () => this.handleRoute());

        // Add home button listener
        document.getElementById('homeButton').addEventListener('click', () => {
            window.location.hash = '';
        });
    }

    handleRoute() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#specifications/')) {
            const productId = hash.split('/')[1];
            this.specificationsPage.render(productId);
        } else if (hash.startsWith('#product/')) {
            const productId = hash.split('/')[1];
            this.productPage.render(productId);
        } else if (hash.startsWith('#edit/')) {
            const productId = hash.split('/')[1];
            this.editProductPage.render(productId);
        } else if (hash === '#edit') {
            this.editProductPage.render();
        } else {
            this.mainPage.render();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new Router();
});