const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({


    userId: { type: String, require: true },
    products: [
        {
            productId: { type: String, require: true },
            quantity: { type: Number, default: 1 }
        }

    ]


},  { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
