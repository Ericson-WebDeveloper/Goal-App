const asyncHanlder = require('express-async-handler');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SignInUser = asyncHanlder(async(req, res) => {
    const {email, password} = req.body;

    let user = await returnUser(email);

    if(!user) {
        res.status(400)
        throw Error('Invalid credentials.');
    }
   
    if(await bcrypt.compare(password, user.password)) {
        const data = {
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        }
        return res.json({'message': 'Sign In Complete', data}).status(200);
    } else {
        res.status(400)
        throw Error('Invalid credentials.');
    }
});

const SignUpUser = asyncHanlder(async(req, res) => {
    //try {
        const {name, email, password, confirm_password} = req.body;
        if(!name || !email || !password) {
            res.status(422);
            throw Error('Complete All Data Fields');
        }

        let emailExists = await returnUser(email);

        if(emailExists  != false) {
            res.status(400)
            throw Error('Email is already use.');
        }

        if(password != confirm_password) {
            res.status(400)
            throw Error('Password not match in Confirm password.');
        }

        let newPass = await passworEncrypt(password);

        let response = await User.create({
            name, email, password: newPass
        });

        if(response) {
            const data = {
                name: response.name,
                email: response.email,
                token: generateToken(response.id)
            }
            return res.json({message: 'Sign Up Complete', data}).status(200);
        } else {
            res.status(400);
            throw new Error('Sign Up Failed');
        }
    // } catch (error) {
    //     return res.status(500).json({error: 'Something wrong please try again later'});
            
    // }
});

const MeUser = asyncHanlder(async(req, res) => {
    return res.status(200).json({data: req.user});
});

const passworEncrypt = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const returnUser = async(email) => {
    try {
        let userExist = await User.findOne({email: email});
        if(userExist) {
            return userExist;
        } else {
            return false;
        }
    } catch (error) {
        res.status(500);
            throw new Error('Something wrong please try again later');
    }
};

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = {
    SignInUser,
    SignUpUser,
    MeUser
}