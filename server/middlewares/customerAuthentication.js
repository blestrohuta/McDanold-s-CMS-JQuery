const { Customer } = require("../models");
const { decodeToken } = require("../helpers/jwt");

async function customerAuthentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticated" };
    let payload = decodeToken(access_token);
    let customer = await Customer.findByPk(payload.id);
    if (!customer) throw { name: "Unauthenticated" };
    req.customer = { id: customer.id, email: customer.email };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = customerAuthentication;
