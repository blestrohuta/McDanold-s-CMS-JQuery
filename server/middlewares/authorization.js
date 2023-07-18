const { Cuisine, Category, User } = require("../models");

async function authorization(req, res, next) {
  try {
    let authorId = req.user.id;
    const id = req.params.id;
    const cuisine = await Cuisine.findByPk(id, {
      include: [{ model: User, attributes: { exclude: "password" } }, Category],
    });

    if (!cuisine) {
      throw {
        name: "dataNotFound",
      };
    }

    const user = await User.findByPk(authorId);
    if (user.role !== "admin" && cuisine.authorId !== user.id) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function updateStatusAuthorization(req, res, next) {
  try {
    let authorId = req.user.id;
    const id = req.params.id;

    const cuisine = await Cuisine.findByPk(id, {
      include: [{ model: User, attributes: { exclude: "password" } }, Category],
    });

    if (!cuisine) {
      throw {
        name: "dataNotFound",
      };
    }

    const user = await User.findByPk(authorId);
    if (user.role !== "admin") {
      throw { name: "forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authorization, updateStatusAuthorization };
