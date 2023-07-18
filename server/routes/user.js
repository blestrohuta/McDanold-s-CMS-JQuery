const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const {
  authorization,
  updateStatusAuthorization,
} = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);
router.use(authentication);

router.get("/cuisines", Controller.getCuisine);
router.post("/cuisines", Controller.postCuisine);
router.get("/cuisines/:id", Controller.getCuisineById);
router.delete("/cuisines/:id", authorization, Controller.deleteCuisineById);
router.get("/categories", Controller.getCategories);
router.post("/categories", Controller.postCategory);
router.delete("/categories/:id", Controller.deleteCategoryById);

router.patch(
  "/cuisines/:id",
  updateStatusAuthorization,
  Controller.modifyCuisineById
);
router.put("/cuisines/:id", authorization, Controller.replaceCuisineById);
router.get("/histories", Controller.getHistories);

module.exports = router;
