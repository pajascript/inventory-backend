const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false
        },
        img: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Number,
            default: 0
        }

    }, { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);