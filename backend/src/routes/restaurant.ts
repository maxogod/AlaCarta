import { Router } from "express";
import {
    addProductController,
    deleteProductController,
    getProductsController,
    updateProductController,
} from "../controllers/products";
import {
    addOrUpdateProductValidation,
    createOrUpdateMenuValidation,
    deleteProductValidation,
    deleteRestaurantValidation,
} from "../middlewares/restaurantValidation";
import {
    deleteRestaurantController,
    getRestaurantController,
} from "../controllers/restaurant";
import {
    createMenuController,
    getMenuController,
    updateMenuController,
} from "../controllers/menu";

const router = Router();

// Restaurant
router.get("/", getRestaurantController);

router.delete("/", deleteRestaurantValidation, deleteRestaurantController);

// Menu
router.post("/menu", createOrUpdateMenuValidation, createMenuController);

router.put("/menu", createOrUpdateMenuValidation, updateMenuController);

router.get("/menu", getMenuController);

// Products
router.post("/products", addOrUpdateProductValidation, addProductController);

router.get("/products", getProductsController);

router.get("/products/:productId", getProductsController);

router.put(
    "/products/:productId",
    addOrUpdateProductValidation,
    updateProductController
);

router.delete(
    "/products/:productId",
    deleteProductValidation,
    deleteProductController
);

// TODO Orders

export default router;
