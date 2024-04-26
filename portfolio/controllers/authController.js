const { getLogin } = require("../repositories/userRepo");
const { ExpireTime, ExpireTimeString } = require("../config/const");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getLogin(username);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { email: user.email },
          "JohnsDavid@2024Portfolio",
          { expiresIn: ExpireTimeString }
        );

        res.cookie("token", token, {
          maxAge: ExpireTime,
          path: "/",
          sameSite: "Lax",
        });

        res.json({ status: 200, token });
      } else {
        res.json({ status: 401, erreur: "psw" });
      }
    } else {
      res.json({ status: 401, erreur: "id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};
module.exports = { login };
