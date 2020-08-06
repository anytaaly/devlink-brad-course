const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@route    POSTT api/users
//@desc     Register user
//@acess    Public
router.post(
  "/",
  [
    check("name", "Name is a required field").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //check if User exist
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }
      user = new User({
        name,
        email,
        password,
      });

      //Encrpt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      //save users in mongodb
      await user.save();

      //return the response
      res.send("User registered in database");
    } catch (err) {
      console.log(err.message);
      req.status(500).send("server error");
    }
  }
);

module.exports = router;
