const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "product",
    // },
    title: {
        type: String,
        ref: "product",
    },
    description: String,
    price: {
        type: Number,
        ref: "product",
        required: true,
    },
    discountPercentage: {
        type: Number,
        ref: "product",
        required: false,
    },
    rating: {
        type: Number,
        ref: "product",
        required: false,
        default: 0,
    },
    brand: {
        type: String,
        ref: "product",
        required: true,
    },
    category: {
        type: String,
        ref: "product",
        required: true,
    },
    thumbnail: String,
    images: [String],
});

module.exports = mongoose.model("product", productSchema);
