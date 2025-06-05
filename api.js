const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let products = [
    {
        id: uuidv4(),
        name: 'MacBook Pro',
        price: 1299.99,
        category: 'Electronics',
        description: 'High-performance laptop for professionals',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
        details: '15.6-inch 4K display, Intel Core i9, 32GB RAM, 1TB SSD'
    },
    {
        id: uuidv4(),
        name: 'iPhone 15',
        price: 799.99,
        category: 'Electronics',
        description: 'Latest smartphone with advanced features',
        image: 'https://avatars.mds.yandex.net/i?id=326fb1d566045e2168b621d69a6d31a7_l-5221896-images-thumbs&n=13',
        details: '6.7-inch OLED display, 5G capable, 256GB storage'
    },
    {
        id: uuidv4(),
        name: 'Audio-Technica ATH-M50x',
        price: 149.99,
        category: 'Audio',
        description: 'Professional studio monitor headphones',
        image: 'https://avatars.mds.yandex.net/i?id=65361de8a41e42222804d07db78f39eb_l-5235360-images-thumbs&n=13',
        details: 'Critically acclaimed sonic performance, 45mm large-aperture drivers'
    },
    {
        id: uuidv4(),
        name: 'iPad Pro',
        price: 999.99,
        category: 'Electronics',
        description: 'Powerful tablet for creative professionals',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
        details: '12.9-inch Liquid Retina XDR display, M2 chip, 512GB storage'
    },
    {
        id: uuidv4(),
        name: 'Apple Watch Series 8',
        price: 399.99,
        category: 'Electronics',
        description: 'Advanced health monitoring and fitness tracking',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80',
        details: 'Always-On Retina display, ECG app, Blood Oxygen sensor'
    },
    {
        id: uuidv4(),
        name: 'Sony WH-1000XM4',
        price: 349.99,
        category: 'Audio',
        description: 'Premium wireless noise-canceling headphones',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
        details: 'Industry-leading noise cancellation, 30-hour battery life'
    },
    {
        id: uuidv4(),
        name: 'Dell XPS 13',
        price: 1199.99,
        category: 'Electronics',
        description: 'Ultra-portable premium laptop',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
        details: '13.4-inch InfinityEdge display, Intel Core i7, 16GB RAM, 512GB SSD'
    },
    {
        id: uuidv4(),
        name: 'AirPods Pro',
        price: 249.99,
        category: 'Audio',
        description: 'Wireless earbuds with active noise cancellation',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80',
        details: 'Active Noise Cancellation, Transparency mode, Adaptive EQ'
    },
    {
        id: uuidv4(),
        name: 'Gaming Mouse',
        price: 79.99,
        category: 'Gaming',
        description: 'High-precision gaming mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80',
        details: '16,000 DPI optical sensor, programmable buttons, RGB lighting'
    },
    {
        id: uuidv4(),
        name: 'Mechanical Keyboard',
        price: 159.99,
        category: 'Gaming',
        description: 'RGB mechanical gaming keyboard',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
        details: 'Cherry MX switches, per-key RGB lighting, aluminum frame'
    }
];

// GET /api/products - Get all products with optional filtering
app.get('/api/products', (req, res) => {
    let filteredProducts = [...products];
    
    // Filter by category
    if (req.query.category) {
        filteredProducts = filteredProducts.filter(
            product => product.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }
    
    // Filter by price range
    if (req.query.minPrice) {
        filteredProducts = filteredProducts.filter(
            product => product.price >= parseFloat(req.query.minPrice)
        );
    }
    if (req.query.maxPrice) {
        filteredProducts = filteredProducts.filter(
            product => product.price <= parseFloat(req.query.maxPrice)
        );
    }
    
    // Filter by name search
    if (req.query.search) {
        filteredProducts = filteredProducts.filter(
            product => product.name.toLowerCase().includes(req.query.search.toLowerCase())
        );
    }
    
    res.json(filteredProducts);
});

// GET /api/products/:id - Get a single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
    const { name, price, category, description, image, details } = req.body;
    
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Name, price, and category are required' });
    }
    
    const newProduct = {
        id: uuidv4(),
        name,
        price: parseFloat(price),
        category,
        description: description || '',
        image: image || '',
        details: details || ''
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
    const { name, price, category, description, image, details } = req.body;
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    products[productIndex] = {
        ...products[productIndex],
        name: name || products[productIndex].name,
        price: price ? parseFloat(price) : products[productIndex].price,
        category: category || products[productIndex].category,
        description: description !== undefined ? description : products[productIndex].description,
        image: image !== undefined ? image : products[productIndex].image,
        details: details !== undefined ? details : products[productIndex].details
    };
    
    res.json(products[productIndex]);
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
}); 