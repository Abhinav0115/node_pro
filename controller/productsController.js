//db data
const Products = require("../models/productSchema");

//create POST /products
const createProduct = (req, res) => {
    //m1
    // const productBody = req.body;
    // if (!productBody) {
    //     res.status(400).json({ message: "Product is required" });
    // } else {
    //     const product = Products.create(productBody);
    //     res.status(201).json({
    //         message: "Product created successfully",
    //         productBody,
    //     });
    // }

    //m2
    const product = new Products(req.body);
    product.save();
    res.status(201).json(product);
};

//Read GET /products
const getAllproducts = async (req, res) => {
    //find all products
    const products = await Products.find();
    /*
    we can also use filter in find method
    find all products with price greater than 800
    code-> const products = await Products.find({ price: { $gt: 800 } });
    */

    res.json(products);
};

//Read GET /products/:id
const getproduct = async (req, res) => {
    //m1
    // const product = await Products.findOne({ _id: req.params.id });

    //m2
    const product = await Products.findById(req.params.id);

    if (!product) {
        res.status(404).json({ message: "Product not found" });
    }
    res.send(product);
};

//update PUT /products/:id  --> overwrite earlier data
const replaceproducts = async (req, res) => {
    try {
        const product = await Products.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        );
        res.status(203).json(product);
    } catch (error) {
        console.log("err -> ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

//update PATCH /products/:id  --> only update the data that is provided
const updateproducts = async (req, res) => {
    try {
        const product = await Products.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.status(201).json(product);
    } catch (error) {
        console.log("err -> ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

//delete DELETE /products/:id
const deleteproducts = async (req, res) => {
    try {
        const product = await Products.findOneAndDelete({
            _id: req.params.id,
        });
        res.status(201).json(product);
    } catch (error) {
        console.log("err -> ", error);
        res.status(404).json({ message: "Product not found" });
    }
};

module.exports = {
    deleteproducts,
    updateproducts,
    replaceproducts,
    getproduct,
    getAllproducts,
    createProduct,
};
