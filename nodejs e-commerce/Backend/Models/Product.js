const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    title: { type: String, require: true },
    desc: { type: String, require: true},
    img: { type: String, require: true},
    categories: { type: Array},
    size: { type: String },
    color: { type: String },
    price: { type: Number, require: true },
    
},  { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
