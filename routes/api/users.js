const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User Registeration ");
  }
);

module.exports = router;
