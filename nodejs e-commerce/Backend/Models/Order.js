const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({


    userId: { type: String, require: true },
    products: [
        {
            productId: { type: String, require: true },
            quantity: { type: Number, default: 1 }
        }

    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" }

},  { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
