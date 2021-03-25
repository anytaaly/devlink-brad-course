const express = require('express'),
  router = express.Router(),
  bcrypt= require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  config = require('config'); 
const { check, validationResult } = require('express-validator');

const User = require('../../models/User')


//@route    GET api/users
//@desc     Test route
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //400 is bad request
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, password} = req.body

    try{
    //See if users exists  - findOne is a mongoDb method - 
    let user = await User.findOne({email}); 

    if(user){
        return res.status(400).json({errors:[{msg: 'User already exists'}]}); 
    }
    user = new User({
        name,
        email,
        password
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(password, salt);
    await user.save(); 

    //Return jsonwebtoken - for this App we are using node-jsonwebtoken, a package, refer this link for documentation on node-jsonwebtoken 
    //https://github.com/auth0/node-jsonwebtoken
    const payload = {
      user:{
            id:user.id    //with moongose abstract we dont need to use _id 
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 99000}, (err, token) => { 
        if(err) throw err; 
        res.json({token})
    })

    //return res.send('User Registered');


    } catch(err){
        console.error(err.message);
        return res.status(500).send('Server Errors')
    }
  }
);

module.exports = router;
