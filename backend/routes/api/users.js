const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//validator

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, firstName, lastName, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      const nameCheck = await User.findOne({
        where: { username: username }
      });

      const emailCheck = await User.findOne({
        where: { email: email }
      })

      if( emailCheck !== null ){
        return res.status(500).json({
          "message": "User already exists",
          errors:{
            "email": "User with that email already exists"
          }
        });
      } else if (nameCheck !== null) {
        return res.status(500).json({
        "message": "User already exists",
        errors: {
          "username": "User with that username already exists"
        }
      });

    } else {

        const user = await User.create({ username, firstName, lastName, email, hashedPassword });

        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
          user: safeUser
        })

      }
    }
);

module.exports = router;
