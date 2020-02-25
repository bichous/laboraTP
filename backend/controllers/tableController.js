const Table = require('../models/Table');

exports.allTables = (req, res) => {
  //if (req.user) {
  Table.find()
    .then(tables => res.status(200).json({ tables }))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  //} else {
  //res.status(401).json({ message: `You have to be loged first` });
  //}
};

exports.createTable = (req, res) => {
  Table.create({ ...req.body })
    .then(table => res.status(200).json({ table }))
    .catch(err =>
      res.status(500).json({ message: `The table wasn't created` })
    );
};
