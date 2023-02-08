const express = require("express");
const { getAllProducts, getAllProductsStatic } = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/static", getAllProductsStatic);

module.exports = productsRouter;
