const { getAllCountry } = require("../repositories/ListNeededs");
const {
  getContactByWhereRepo,
  createContactRepo,
  updateContactRepo,
  deleteContactRepo,
} = require("../repositories/contactRepo");

const { showError } = require("../middleware/utilities");
const getAllContact = async (req, res) => {
  const message = "la récupération des données.";
  try {
    const contacts = await getContactByWhereRepo();
    const country = await getAllCountry();

    if (contacts != "error") {
      res.json({
        status: 200,
        contacts: contacts,
        country: country,
      });
    } else {
      res.json({
        status: 404,
        error: showError(1, message),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: showError(2, message),
    });
  }
};

const getContactById = async (req, res) => {
  const message = "la récupération des données.";
  try {
    const contact = await getContactByWhereRepo(
      ` AND contact_id = ${req.params.id}`
    );

    if (contact != "error") {
      res.json({
        status: 200,
        data: contact.length > 0 ? contact[0] : null,
      });
    } else {
      res.json({
        status: 404,
        error: showError(1, message),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: showError(2, message),
    });
  }
};

const createContact = async (req, res, next) => {
  const message = "la création du contact";
  try {
    const contact = req.body;
    const res_contact = await createContactRepo(contact);

    if (res_contact != "error") {
      return res.status(200).json({ status: 200, data: res_contact });
    } else {
      return res.status(500).json({
        status: 500,
        error: showError(1, message),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      error: showError(2, message),
    });
  }
};

const updateContact = async (req, res) => {
  const message = "la modification du contact";
  try {
    const contact = req.body;
    const res_contact = await updateContactRepo(req.params.id, contact);
    if (res_contact) {
      return res.status(200).json({ status: 200, data: res_contact });
    } else {
      return res.json({
        status: 404,
        error: showError(1, message),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      error: showError(2, message),
    });
  }
};

const deleteContact = async (req, res) => {
  const message = "la suppression du contact";
  try {
    const contact = req.body;
    const res_contact = await deleteContactRepo(req.params.id);
    if (res_contact) {
      return res.status(200).json({ status: 200, data: res_contact });
    } else {
      return res.json({
        status: 404,
        error: showError(1, message),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      error: showError(2, message),
    });
  }
};

module.exports = {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
