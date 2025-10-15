// routes/products.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const products = require('../models/productData');

// GET all products with filtering, pagination, and search
router.get('/', (req, res) => {
  let results = [...products];

  // Filter by category
  if (req.query.category) {
    results = results.filter(p => p.category === req.query.category);
  }

  // Search by name
  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(term));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  res.json({ total: results.length, page, limit, data: paginated });
});

// GET product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.json(product);
});

// POST create new product
router.post('/', (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !price || !category)
    return next({ status: 400, message: 'Missing required fields' });

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock: inStock ?? true
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });

  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
