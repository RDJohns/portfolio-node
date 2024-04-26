function isInt(value) {
  let eror_parameter = false;
  try {
    const res =
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value));
    if (!res) {
      eror_parameter = true;
    }
  } catch (error) {
    eror_parameter = true;
  }

  return eror_parameter;
}

const isParamIdValid = async (req, res, next) => {
  let ids = req.params.id.split(",").map((d) => parseInt(d, 10));
  let eror_parameter = ids.map((d) => isInt(d)).filter((d) => d).length > 0;
  if (eror_parameter) {
    res.json({
      status: 404,
      error: "Paramètre invalide. Merci de vérifier.",
    });
    return;
  }
  req.params.id = ids;
  next();
};

module.exports = { isParamIdValid };
