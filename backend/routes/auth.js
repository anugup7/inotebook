const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser")

const JWT_SECRET = "Anuragisagoodb@oy";

//Route1:Creating a user using: post "/api/auth/createUser". No login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
      try {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      //Check whether the user has unique email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      //Securing Password with hash and salt
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      //   res.json(user);
      //Catch errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route2:Authenticate a user using: post "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
        .status(404)
        .json({ error: "Please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
        .status(404)
        .json({ error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    } 
  }
);

//Route3:Get loggedin user details using: post "/api/auth/getuser". login required
router.post(
    "/getuser", fetchuser,
    async (req, res) => {
        try{
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
          } 
    }
)
module.exports = router;
