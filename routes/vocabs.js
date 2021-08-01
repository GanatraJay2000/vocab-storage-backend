const router = require('express').Router();
let Vocab = require('../models/vocabs.model');

router.route('/').get((req, res) => {
  Vocab.find()
    .then(vocabs => res.json(vocabs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {  
  const username = req.body.username;
  const word = req.body.word;
  const description = req.body.description;
  const tags = req.body.tags;

  const newVocab = new Vocab({
    username,
    word,
    description,
    tags,
  });

  newVocab.save()
  .then(() => res.json('Vocabulary added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Vocab.findById(req.params.id)
    .then(vocab => res.json(vocab))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Vocab.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vocabulary deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
  Vocab.findById(req.params.id)
    .then(vocab => {
        vocab.username = req.body.username;
        vocab.word = req.body.word;      
        vocab.description = req.body.description;
        vocab.tags = req.body.tags;      

      vocab.save()
        .then(() => res.json('Vocabulary updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;