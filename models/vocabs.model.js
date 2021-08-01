const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vocabSchema = new Schema({
    username: { type: String, required: true },
    word: { type: String, require: true },
    description: { type: String, require: true },
    tags: [{type: String, require:true }],
}, {
    timestamps: true,
});

const Vocab = mongoose.model('Vocab', vocabSchema);

module.exports = Vocab;