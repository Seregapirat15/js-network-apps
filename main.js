import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';

class Router {
    constructor() {
        this.mainPage = new MainPage();
        this.productPage = new ProductPage();
        
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
        
        if (hash.startsWith('#product/')) {
            const productId = hash.split('/')[1];
            this.productPage.render(productId);
        } else {
            this.mainPage.render();
        }
    }
}

// Initialize the application
new Router();