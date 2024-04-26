var validator = require("validator");

const isValideUser = async (req, res, next) => {
  const data = req.body;

  if (data?.role < 0) {
    res.json({
      status: 404,
      error: `Le profil de l'utilisateur est invalide.`,
    });
    return;
  }

  if (data?.civilitie < 0) {
    res.json({
      status: 404,
      error: `La civilité de l'utilisateur est invalide.`,
    });
    return;
  }

  if (data?.email?.trim().length > 0 && !validator.isEmail(data.email)) {
    res.json({
      status: 404,
      error: `L'e-mail de l'utilisateur est invalide.`,
    });
    return;
  }

  if (data?.fname?.trim().length === 0) {
    res.json({
      status: 404,
      error: `Le prénom de l'utilisateur est invalide.`,
    });
    return;
  }

  if (data?.lname?.trim().length === 0) {
    res.json({
      status: 404,
      error: `Le nom de l'utilisateur est invalide.`,
    });
    return;
  }

  if (data?.username?.trim().length === 0) {
    res.json({
      status: 404,
      error: `Le nom d'utilisateur de l'utilisateur est invalide.`,
    });
    return;
  }

  if (data?.password?.trim().length === 0) {
    res.json({
      status: 404,
      error: `Le mot de passe de l'utilisateur est invalide.`,
    });
    return;
  }

  next();
};

module.exports = { isValideUser };
