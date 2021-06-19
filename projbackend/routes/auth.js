const { body, validationResult, check } = require('express-validator');
var express = require('express');
var router = express.Router();
const {signout, signup, signin,isSignedIn} = require("../controllers/auth");

router.post("/signin",[

    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 5 }),
], signin);

router.post("/signup",[
    check("name", "Name must be atleast 5 characters long").isLength({ min: 5 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 5 characters").isLength({ min: 5 }),
], signup);


router.get("/signout", signout);


module.exports = router; 