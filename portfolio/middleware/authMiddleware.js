const jwt = require("jsonwebtoken");
const { ExpireTime, ExpireTimeString } = require("../config/const");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Aucun token fourni, renvoyer une erreur 401 (Non autorisé)
    return res.status(401).json({ status: 401, error: "Token missing" });
  }

  // Extraire le token du header
  const token = authHeader.split(" ")[1];

  // Vérifier la validité du token
  jwt.verify(token, "JohnsDavid@2024Portfolio", (err, user) => {
    if (err) {
      // Token invalide, renvoyer une erreur 403 (Interdit)
      return res.status(403).json({ status: 403, error: "Invalid token" });
    }
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

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
