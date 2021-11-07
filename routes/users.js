const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
//Express validator
const {check, validationResult} = require('express-validator/check');

const User = require('../models/User')


// @route   POST api/users
// @desc    Registering a user
// @access  Public
router.post('/', 
[
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with more than 6 characters').isLength({min:6})
],
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ erros:errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ msg: "user already exists"})
        }

        user = new User({
            name,
            email,
            password
        });

        // Hashing password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000, 
            }, (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        );
        

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;