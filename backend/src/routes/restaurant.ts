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
    deleteEmployeeValidation,
    deleteOrUpdateRestaurantValidation,
    deleteProductValidation,
} from "../middlewares/restaurantValidation";
import {
    deleteEmployeeController,
    deleteRestaurantController,
    getEmployeesController,
    getRestaurantController,
    updateEmployeeController,
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
// TODO delete category deletes it from all products

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

// Employees
router.get("/employees", getEmployeesController);

router.put(
    "/employees/:employeeId",
    deleteOrUpdateRestaurantValidation,
    updateEmployeeController
);

router.delete(
    "/employees/:employeeId",
    deleteEmployeeValidation,
    deleteEmployeeController
);

export default router;
