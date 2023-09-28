const expres = require("express");

const router = expres.Router();

const {
    deleteproducts,
    updateproducts,
    replaceproducts,
    getproduct,
    getAllproducts,
    createProduct,
} = require("../controller/productsController");

//create POST /products
router
    .post("/", createProduct)
    .get("/", getAllproducts)
    .get("/:id", getproduct)
    .put("/:id", replaceproducts)
    .patch("/:id", updateproducts)
    .delete("/:id", deleteproducts);

module.exports = router;
