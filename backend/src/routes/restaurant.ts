import { Router } from "express";
import {
    addProductController,
    getProductsController,
} from "../controllers/products";
import { addProductValidation } from "../middlewares/productValidation";
import { getRestaurantController } from "../controllers/restaurant";
import { createMenuValidation } from "../middlewares/menuValidation";
import { createMenuController } from "../controllers/menu";

const router = Router();

// Restaurant
router.get("/", getRestaurantController);

// Menu
// TODO - Add menu validation so that only managers or owners can edit it, same with products
router.post("/createMenu", createMenuValidation, createMenuController);

// Products
router.post("/addProduct", addProductValidation, addProductController);

router.get("/products", getProductsController);

export default router;
