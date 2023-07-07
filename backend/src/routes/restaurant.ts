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
    deleteOrUpdateRestaurantValidation,
    deleteProductValidation,
} from "../middlewares/restaurantValidation";
import {
    deleteRestaurantController,
    getRestaurantController,
    updateRestaurantController,
} from "../controllers/restaurant";
import {
    createMenuController,
    getMenuController,
    updateMenuController,
} from "../controllers/menu";

const router = Router();

// Restaurant
router.get("/", getRestaurantController);

router.put("/", deleteOrUpdateRestaurantValidation, updateRestaurantController);

router.delete(
    "/",
    deleteOrUpdateRestaurantValidation,
    deleteRestaurantController
);

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

// TODO Employees
// router.get("/employees");

// router.put("/employees/:employeeId");

// router.delete("/employees/:employeeId");

export default router;
