const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Path to products JSON file
const productsFilePath = path.join(__dirname, 'data', 'products.json');

// Helper function to read products from file
const readProductsFromFile = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
};

// Helper function to write products to file
const writeProductsToFile = (products) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing products file:', error);
        return false;
    }
};

// GET /api/products - Get all products with optional filtering
app.get('/api/products', (req, res) => {
    const products = readProductsFromFile();
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
    const products = readProductsFromFile();
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
    
    const products = readProductsFromFile();
    products.push(newProduct);
    
    if (writeProductsToFile(products)) {
        res.status(201).json(newProduct);
    } else {
        res.status(500).json({ message: 'Failed to save product' });
    }
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
    const { name, price, category, description, image, details } = req.body;
    const products = readProductsFromFile();
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
    
    if (writeProductsToFile(products)) {
        res.json(products[productIndex]);
    } else {
        res.status(500).json({ message: 'Failed to update product' });
    }
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
    const products = readProductsFromFile();
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    
    if (writeProductsToFile(products)) {
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } else {
        res.status(500).json({ message: 'Failed to delete product' });
    }
});

// Catch-all route to serve the SPA
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
}); 