const express = require("express");
const router = express.Router();

//@route    GET api/users
//@desc     Test route
//@acess    Public
router.get("/", (req, res) => res.send("Payment route"));

module.exports = router;