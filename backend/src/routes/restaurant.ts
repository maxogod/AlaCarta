import { Router } from "express";
import {
    addProductController,
    deleteProductController,
    getProductsController,
} from "../controllers/products";
import {
    addProductValidation,
    createMenuValidation,
    deleteProductValidation,
    deleteRestaurantValidation,
} from "../middlewares/restaurantValidation";
import {
    deleteRestaurantController,
    getRestaurantController,
} from "../controllers/restaurant";
import { createMenuController, getMenuController } from "../controllers/menu";

const router = Router();

// Restaurant
router.get("/", getRestaurantController);

router.delete("/", deleteRestaurantValidation, deleteRestaurantController);

// Menu
router.post("/createMenu", createMenuValidation, createMenuController);

router.get("/menu", getMenuController);

// Products
router.post("/addProduct", addProductValidation, addProductController);

router.get("/products", getProductsController);

router.get("/products/:productId", getProductsController);

router.delete(
    "/products/:productId",
    deleteProductValidation,
    deleteProductController
);

// TODO Orders

export default router;
