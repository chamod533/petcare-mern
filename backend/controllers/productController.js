const Product = require('../models/Product');

// GET all products
exports.getAllProducts = async (req, res) => {
try {
const { search, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // Search text
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price filtering
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);    
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
try {
const product = await Product.findById(req.params.id);
if (!product) return res.status(404).json({ message: 'Product not found' });
res.json(product);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// CREATE product (admin)
exports.createProduct = async (req, res) => {
try {
const product = new Product(req.body);
const saved = await product.save();
res.status(201).json(saved);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// UPDATE product (admin)
exports.updateProduct = async (req, res) => {
const { id } = req.params;
const updates = req.body;

try {
const product = await Product.findByIdAndUpdate(id, updates, { new: true });
if (!product) return res.status(404).json({ message: 'Product not found' });
res.json(product);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// DELETE product (admin)
exports.deleteProduct = async (req, res) => {
const { id } = req.params;
try {
const product = await Product.findByIdAndDelete(id);
if (!product) return res.status(404).json({ message: 'Product not found' });
res.json({ message: 'Product deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};
