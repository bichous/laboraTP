const Order = require('../models/Order');

exports.allOrders = (req, res) => {
  if (req.user) {
    Order.find()
      .then(orders => res.status(200).json({ orders }))
      .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  } else {
    res.status(401).json({ message: `You have to be loged first` });
  }
};

exports.ordersByUser = (req, res) => {
  if (req.user) {
    const { _id } = req.user;
    Order.find({ userId: _id })
      .populate('userId')
      .populate('productList')
      .populate('tableId')
      .then(orders => res.status(200).json({ orders }))
      .catch(err =>
        res
          .status(500)
          .json({ message: 'Something went wrong with the orders' })
      );
  } else {
    res.status(401).json({ message: `You have to be loged first` });
  }
};

exports.createOrder = (req, res) => {
  if (req.user) {
    const { _id } = req.user;
    Order.create({ ...req.body })
      .then(order => res.status(200).json({ order }))
      .catch(err =>
        res.status(500).json({ message: `The order wasn't created` })
      );
  } else {
    res.status(401).json({ message: `You have to be loged first` });
  }
};
