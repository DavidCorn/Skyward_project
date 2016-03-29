const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ei_db');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
