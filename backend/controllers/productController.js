const Product = require('../models/Product');

exports.allProducts = (req, res) => {
  Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
};

exports.createProduct = (req, res) => {
  Product.create({ ...req.body })
    .then(product => res.status(200).json({ product }))
    .catch(err =>
      res.status(500).json({ message: `The product wasn't created` })
    );
};
