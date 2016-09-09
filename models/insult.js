const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insultSchema = new mongoose.Schema({
    text: String
});

mongoose.model('Insult', insultSchema);