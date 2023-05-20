const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/v1", userController.insertUser); //register
router.get("/v2", userController.getUser); //login

module.exports = router;
