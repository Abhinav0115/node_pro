//express
const expres = require("express");
const app = expres();

//path
const path = require("path");

//env files
require("dotenv").config();

//db connection
const connectDB = require("./config/dbconnection");
connectDB();

//cors
const cors = require("cors");

//file system
const fs = require("fs");

//routes
const productRouter = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

//body parser
app.use(expres.json());
app.use(expres.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use(expres.urlencoded({ extended: false }));

//cors
app.use(cors());

//route
app.use("/products", productRouter);
app.use("/users", userRoutes);

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
// app.use("*", (req, res) => {
//     res.sendFile(__dirname+ "/build/index.html");
// });

//error handling
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

//server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
