const { User, Cuisine, Category, History } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, decodeToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async getCuisine(req, res, next) {
    try {
      const cuisine = await Cuisine.findAll({
        include: [
          { model: User, attributes: { exclude: "password" } },
          Category,
        ],
      });
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async postCuisine(req, res, next) {
    try {
      const authorId = req.user.id;
      const userEmail = req.user.email;
      const { name, description, price, imgUrl, categoryId } = req.body;
      const cuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId,
      });

      const addedHistory = {
        name: name,
        description: `new cuisine with id ${cuisine.id} created`,
        updatedBy: userEmail,
      };

      const history = await History.create(addedHistory);

      res.status(201).json({ cuisine, history });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      const id = req.params.id;
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
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisineById(req, res, next) {
    try {
      const id = req.params.id;
      // console.log(id);
      const deletedCuisine = await Cuisine.findOne({
        where: { id },
      });
      await Cuisine.destroy({
        where: { id },
      });
      res.status(200).json(deletedCuisine);
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id);
      const deletedCategory = await Category.findOne({
        where: { id },
      });
      await Category.destroy({
        where: { id },
      });
      res.status(200).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;
      const userEmail = req.user.email;
      const category = await Category.create({ name });

      const addedHistory = {
        name: name,
        description: `new category with id ${category.id} created`,
        updatedBy: userEmail,
      };

      const history = await History.create(addedHistory);

      res.status(200).json({ category, history });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      res.status(201).json({ id: createUser.id, email: createUser.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailIsRequired" };
      if (!password) throw { name: "PasswordIsRequired" };
      const user = await User.findOne({
        where: { email },
      });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: "EmailPasswordInvalid" };
      }
      res.status(200).json({
        access_token: signToken({ id: user.id }),
        username: user.username,
        email: user.email,
        role: user.role,
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

      const { name, email } = payload;
      const password = String(Math.random());
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email: email,
          password: password,
          role: "staff",
        },
      });

      res.status(created ? 201 : 200).json({
        access_token: signToken({ id: user.id }),
        user: await User.findByPk(user.id, {
          attributes: ["id", "username", "email", "role"],
        }),
      });
    } catch (err) {
      next(err);
    }
  }

  static async modifyCuisineById(req, res, next) {
    const id = req.params.id;
    const userEmail = req.user.email;
    const status = req.body.status;
    try {
      const cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "dataNotFound" };

      const prevStatus = cuisine.status;
      cuisine.status = status;
      const patchedCuisine = await cuisine.save();

      const addedHistory = {
        name: patchedCuisine.name,
        description: `cuisine status with id ${patchedCuisine.id} has been updated from ${prevStatus} into ${patchedCuisine.status}`,
        updatedBy: userEmail,
      };

      const history = await History.create(addedHistory);
      res.status(200).json({
        patchedCuisine,
        history,
      });
    } catch (err) {
      next(err);
    }
  }

  static async replaceCuisineById(req, res, next) {
    const id = req.params.id;
    const { name, description, price, imgUrl, categoryId } = req.body;
    const userEmail = req.user.email;

    try {
      const cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "dataNotFound" };
      cuisine.set({
        name,
        description,
        price,
        imgUrl,
        categoryId,
      });
      const updatedCuisine = await cuisine.save();

      const addedHistory = {
        name: updatedCuisine.name,
        description: `cuisine with id ${updatedCuisine.id} updated`,
        updatedBy: userEmail,
      };

      const history = await History.create(addedHistory);

      res.status(200).json({ updatedCuisine, history });
    } catch (err) {
      next(err);
    }
  }

  static async getHistories(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        histories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
