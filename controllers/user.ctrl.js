const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const userValidation = require("../validation/user.validation");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.userSignup = (req, res) => {
  const { body, protocol, file } = req;
  const { error } = userValidation(body).userSignupValidation;
  if (error) return res.status(401).json({ message: error.details[0].message });

  bcrypt
    .hash(body.password, 12)
    .then((hash) => {
      if (!hash)
        return res.status(500).json({ message: "Erreur lors du hash" });

      delete body.password;
      new User({
        ...body,
        password: hash,
        picture: `${protocol}://${req.get("host")}/public/user/images/${
          file.filename
        }`,
      })
        .save()
        .then(() => res.status(201).json({ message: "Account created" }))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
  // save base de données
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.userLogin = (req, res) => {
  const { body } = req;
  const { error } = userValidation(body).userLoginValidation;
  if (error) return res.status(401).json({ message: error.details[0].message });

  User.findOne({ email: body.email })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User Not Found" });

      bcrypt
        .compare(body.password, user.password)
        .then((match) => {
          if (!match)
            res
              .status(404)
              .json({ message: "email or password are incorrect" });

          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};
