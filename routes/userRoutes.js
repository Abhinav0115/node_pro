const expres = require("express");

const router = expres.Router();

const {
    deleteusers,
    updateusers,
    replaceusers,
    getuser,
    getAllusers,
    createuser,
} = require("../controller/usersController");

//create POST /products
router
    .post("/", createuser)
    .get("/", getAllusers)
    .get("/:id", getuser)
    .put("/:id", replaceusers)
    .patch("/:id", updateusers)
    .delete("/:id", deleteusers);

module.exports = router;
