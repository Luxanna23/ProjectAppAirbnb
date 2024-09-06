import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";

const router = express.Router();
const saltRounds = 10;

//pour register
router.post(
  "/register",
  [
    check("firstname").not().isEmpty().withMessage("Le champs prenom est requis"),
    check("lastname").not().isEmpty().withMessage("Le champs nom est requis"),
    check("email").isEmail().withMessage("L'email n'est pas valide"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Le mot de passe doit faire minimum 3 caracteres"),
  ],
  async (req, res) => {
    console.log("je suis dans register");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ firstname, lastname, email, hashedPassword });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// pour se connecter
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //verif de l'email
    if (!user) { 
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrectes" });
    }
    //verif du hashage du mdp
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
