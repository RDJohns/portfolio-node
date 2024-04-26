const {
  contactVerification,
  getContactByIdRepos,
} = require("../../repositories/contactRepo");

var validator = require("validator");

const isIdContactExist = async (req, res, next) => {
  try {
    const verif = await getContactByIdRepos(req.params.id);

    if (verif.length === 0) {
      res.json({
        status: 500,
        data: "Ce contact n'existe pas.",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: "Erreur lors de vérifications du contact.",
    });
    return;
  }
  next();
};

const isExisteContact = async (req, res, next) => {
  const data = req.body;
  const id_param = req.params.id;

  let where_contact_name = ` AND contact_name = '${data.contact_name.replaceAll(
    "'",
    "''"
  )}'`;

  if (id_param) {
    where_contact_name += ` AND contact_id != ${id_param}`;
  }

  if ((await contactVerification(where_contact_name))?.length) {
    res.json({
      status: 404,
      error: `Le nom du contact "${data.contact_name}" exist déjà.`,
    });
    return;
  }

  next();
};

const isValideContact = async (req, res, next) => {
  const data = req.body;
  if (data?.contact_name?.trim().length === 0 || !data?.contact_name) {
    res.json({
      status: 404,
      error: `Le nom du contact du contact est invalide.`,
    });
    return;
  }

  if (
    data?.contact_email?.trim().length > 0 &&
    !validator.isEmail(data.contact_email)
  ) {
    res.json({
      status: 404,
      error: `L'e-mail du contact est invalide.`,
    });
    return;
  }

  if (!data?.contact_country) {
    res.json({
      status: 404,
      error: `Le pays du contact est invalide.`,
    });
    return;
  }

  if (data?.contact_zipcode?.trim().length === 0 || !data?.contact_zipcode) {
    res.json({
      status: 404,
      error: `Le code postal du contact est invalide.`,
    });
    return;
  }

  if (data?.contact_city?.trim().length === 0 || !data?.contact_city) {
    res.json({
      status: 404,
      error: `La ville du contact est invalide.`,
    });
    return;
  }

  if (data?.contact_adress_1?.trim().length === 0 || !data?.contact_adress_1) {
    res.json({
      status: 404,
      error: `L'adresse 1 du contact est invalide.`,
    });
    return;
  }
  next();
};

module.exports = {
  isValideContact,
  isIdContactExist,
  isExisteContact,
};
