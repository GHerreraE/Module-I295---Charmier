import express from "express";
import { products } from "../db/mock-prodcut.mjs";
import { success } from "./helper.mjs";

const productsRouter = express();
productsRouter.get("/", (req, res) => {
  const message = "Liste ready";
  res.json(success(message, products));
});

export { productsRouter };
