const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  key: {
    type: String
  },
  value: {
    type: Object,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'config'
  }
}, { timestamps: true, collection: 'config' });

const Config = mongoose.model('Config', configSchema);
module.exports = Config;