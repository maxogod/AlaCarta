import { Router } from "express";
import {
    loginController,
    registerController,
    registerRestaurantController,
} from "../controllers/auth";
import {
    loginValidation,
    registerValidation,
    registerRestaurantValidation,
} from "../middlewares/validation";

const router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

router.post(
    "/registerRestaurant",
    registerRestaurantValidation,
    registerRestaurantController
);

export default router;
