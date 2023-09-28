const fs = require("fs");
const path = require("path");
const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname,"../public", "data.json"), "utf-8")
);
let usersList = data.users;

//create POST /users
const createuser = (req, res) => {
    const user = req.body;

    usersList.push(user);
    res.json(user);
    res.status(201).end();
};

//Read GET /users
const getAllusers = (req, res) => {
    res.json(usersList);
    res.end();
};

//Read GET /users/:id
const getuser = (req, res) => {
    const user = usersList.find((p) => p.id === +req.params.id);

    if (!user) {
        res.status(404).json({ message: "user not found" });
    }
    res.send(user);
};

//update PUT /users/:id  --> overwrite earlier data
const replaceusers = (req, res) => {
    const id = +req.params.id;
    const userIndex = usersList.findIndex((p) => p.id === id);
    usersList.splice(userIndex, 1, { ...req.body, id: id });
    res.json(usersList[userIndex]);
    res.status(203).end();
};

//update PATCH /users/:id  --> only update the data that is provided
const updateusers = (req, res) => {
    const id = +req.params.id;
    const userIndex = usersList.findIndex((p) => p.id === id);
    usersList.splice(userIndex, 1, {
        ...usersList[userIndex],
        ...req.body,
    });
    res.json(usersList[userIndex]);
    res.status(201).end();
};

//delete DELETE /users/:id
const deleteusers = (req, res) => {
    const id = +req.params.id;

    if (!usersList.find((p) => p.id === id)) {
        res.status(404).json({ message: "user not found" });
    }
    //m1
    usersList = usersList.filter((p) => p.id !== id);
    //m2
    /*
    const userIndex = usersList.findIndex((p) => p.id === id);
    usersList.splice(userIndex, 1);
*/

    res.json(usersList);
    res.end();
};

module.exports = {
    deleteusers,
    updateusers,
    replaceusers,
    getuser,
    getAllusers,
    createuser,
};
