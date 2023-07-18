const {
  Customer,
  Cuisine,
  Category,
  History,
  CustomerFavorite,
  User,
} = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, decodeToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!email) throw { name: "EmailIsRequired" };
      if (!password) throw { name: "PasswordIsRequired" };
      const createCustomer = await Customer.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res
        .status(201)
        .json({ id: createCustomer.id, email: createCustomer.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailIsRequired" };
      if (!password) throw { name: "PasswordIsRequired" };
      const customer = await Customer.findOne({
        where: { email },
      });
      if (!customer || !comparePassword(password, customer.password)) {
        throw { name: "EmailPasswordInvalid" };
      }
      res.status(200).json({
        access_token: signToken({ id: customer.id }),
        username: customer.username,
        email: customer.email,
        role: customer.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const googleAccessToken = req.headers.google_access_token;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: googleAccessToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const { email } = payload;
      const password = String(Math.random());
      const [customer, created] = await Customer.findOrCreate({
        where: { email },
        defaults: {
          email: email,
          password: password,
          role: "customer",
        },
      });

      res.status(created ? 201 : 200).json({
        access_token: signToken({ id: customer.id }),
        customer: await Customer.findByPk(customer.id, {
          attributes: ["id", , "email", "role"],
        }),
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCuisines(req, res, next) {
    try {
      const keyword = req.query.filterBy;
      const categoryId = req.query.categoryId;
      const page = req.query.page;
      let options = {
        include: [
          { model: User, attributes: { exclude: "password" } },
          Category,
        ],
        order: [["id", "ASC"]],
      };
      if (page) {
        options.limit = 9;
        options.offset = (page - 1) * 9;
      }
      if (keyword) {
        options.where = {
          ...options.where,
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        };
      }
      if (categoryId) {
        options.where = {
          ...options.where,
          categoryId: categoryId,
        };
      }
      const cuisine = await Cuisine.findAll(options);
      delete options.limit;
      delete options.offset;
      const totalCuisines = await Cuisine.count(options);
      res.status(200).json({ cuisine, totalCuisines });
    } catch (error) {
      next(error);
    }
  }

  static async getQRCode(value) {
    return axios({
      method: "post",
      url: "https://api.qr-code-generator.com/v1/create",
      params: {
        "access-token": process.env.QR_CODE_KEY,
      },
      data: {
        frame_name: "no-frame",
        qr_code_text: value,
        image_format: "SVG",
        qr_code_logo: "scan-me-square",
      },
    });
  }

  static async getCuisineById(req, res, next) {
    try {
      const id = req.params.id;
      const { origin } = req.query;
      const cuisine = await Cuisine.findByPk(id, {
        include: [
          { model: User, attributes: { exclude: "password" } },
          Category,
        ],
      });
      if (!cuisine) {
        throw {
          name: "dataNotFound",
        };
      }
      let originURL;
      if (origin !== undefined) {
        originURL = await Controller.getQRCode(origin);
        cuisine.qrcode = originURL;
      }
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerFavorite(req, res, next) {
    try {
      const customerFavorites = await CustomerFavorite.findAll({
        where: {
          CustomerId: req.customer.id,
        },
        include: [
          {
            model: Customer,
            attributes: { exclude: "password" },
          },
          Cuisine,
        ],
      });
      res.status(200).json(customerFavorites);
    } catch (error) {
      next(error);
    }
  }
  static async addCustomerFavorite(req, res, next) {
    try {
      const cuisine = await Cuisine.findByPk(req.params.id);
      if (!cuisine) {
        throw {
          name: "dataNotFound",
        };
      }
      const addedFavorite = await CustomerFavorite.create({
        CustomerId: req.customer.id,
        CuisineId: req.params.id,
      });
      res.status(200).json(addedFavorite);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
