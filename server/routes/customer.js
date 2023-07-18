const express = require("express");
const router = express.Router();
const Controller = require("../controllers/customer");
const customerAuthentication = require("../middlewares/customerAuthentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);
router.get("/cuisines", Controller.getCuisines);
router.get("/cuisines/:id", Controller.getCuisineById);
router.get(
  "/favorites",
  customerAuthentication,
  Controller.getCustomerFavorite
);
router.post(
  "/favorites/:id",
  customerAuthentication,
  Controller.addCustomerFavorite
);

module.exports = router;
