/**
 * Show error message response
 *
 * @param {int} type : 1=> database 2=> server 3=>just message
 * @param {String} message
 * @returns string
 * @author Johns David
 */
const showError = (type = 1, message = "") => {
  return type == 1
    ? `Erreur de la base de donnée lors de ${message}.`
    : type == 2
    ? `Erreur sur le serveur  lors de ${message}.`
    : message;
};

module.exports = {
  showError,
};
