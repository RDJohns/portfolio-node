const db = require("../models/index");

/** Find a list of contact traitant by id
 *
 * @param {int} stId
 * @returns Contact
 * @author Johns David
 */
const getContactByIdRepos = async (reqId) => {
  try {
    const department = await db.Contact.findAll({
      where: {
        contact_id: reqId,
        contact_active: 1,
      },
    });
    return department;
  } catch (error) {
    return null;
  }
};

/** Find contact by personal criteria
 *
 * @param {string} where
 * @returns Contact
 * @author Johns David
 */
const contactVerification = async (where) => {
  const sqlQuery = `SELECT * FROM public.contact WHERE 1=1 AND contact_active = 1 ${where}`;
  const contact = await db.sequelize
    .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
    .then((results) => {
      return results;
    })
    .catch((error) => {
      return null;
    });
  return contact;
};

/**
 * Get only one contact by id
 *
 * @param {int} contact_id
 * @returns Contact
 * @author Johns David
 */
const getContactByWhereRepo = async (where = "") => {
  const sqlQuery = `
  SELECT 
  false  as check,
  contact_id,
  contact_name,
  contact_email, 
  contact_country,
  country.country_name as contact_country_name,
  contact_zipcode,
  contact_city,
  contact_adress_1,
  contact_adress_2,
  contact_adress_3,
  contact_phone_1,
  contact_phone_2,
  contact_fax,
  contact_comment,
  contact_active,
  contact_user_id_update,
  contact_user_id_create,
  TO_CHAR(contact_created_at, 'DD/MM/YYYY') AS date,
  TO_CHAR(contact_created_at, 'DD/MM/YYYY HH24:MI:SS') AS contact_created_at, 
  TO_CHAR(contact_updated_at, 'DD/MM/YYYY HH24:MI:SS') AS contact_updated_at,

  CASE WHEN LENGTH(TRIM(contact_phone_1)) > 0 
    THEN contact_phone_1 
    ELSE contact_phone_2
  	END
   as phone,
  LPAD(contact_id::text, 6, '0') as numero
  FROM public.contact
    LEFT JOIN public.country as country ON country.country_id = contact_country
  WHERE 
    contact_active = 1 ${where}
    ORDER BY contact_id ASC
  `;
  const contacts = await db.sequelize
    .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
    .then(async (results) => {
      return results;
    })
    .catch((error) => {
      console.log(error);
      return "error";
    });
  return contacts;
};

/**
 * Create a new contact
 *
 * @param {object} contact
 * @returns Contact
 * @author Johns David
 */
const createContactRepo = async (contact) => {
  try {
    const result = await db.Contact.create(contact);
    return result;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

/**
 * Update one client
 *
 * @param {int} reqId
 * @param {object} updatedObj
 * @returns Contact
 * @author Johns David
 */
const updateContactRepo = async (reqId, updatedObj) => {
  try {
    if (updatedObj.hasOwnProperty("contact_user_id_create")) {
      delete updatedObj["contact_user_id_create"];
    }
    if (updatedObj.hasOwnProperty("contact_created_at")) {
      delete updatedObj["contact_created_at"];
    }
    updatedObj["contact_updated_at"] = new Date();
    const [affectedRowsCount, updatedContacts] = await db.Contact.update(
      updatedObj,
      {
        where: {
          contact_id: reqId,
        },
        returning: true,
      }
    );
    const updatedContact = updatedContacts[0];
    return updatedContact;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Delete one client(Here we doesn't really delete but desactivate the account.
 * Like that if the client recreate that account, the software just reactivate it)
 *
 * @param {int} reqId
 * @param {object} updatedObj
 * @returns Contact
 * @author Johns David
 */
const deleteContactRepo = async (reqId) => {
  try {
    let updatedObj = {
      contact_updated_at: new Date(),
      contact_active: 0,
    };
    const [affectedRowsCount, updatedContacts] = await db.Contact.update(
      updatedObj,
      {
        where: {
          contact_id: reqId,
        },
        returning: true,
      }
    );
    const updatedContact = updatedContacts[0];
    return updatedContact;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getContactByIdRepos,
  getContactByWhereRepo,
  contactVerification,
  createContactRepo,
  updateContactRepo,
  deleteContactRepo,
};
