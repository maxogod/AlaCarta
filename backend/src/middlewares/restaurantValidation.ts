import { Request, Response, NextFunction } from "express";
import {
    checkUserPermissions,
    restaurantCategoryOfUser,
} from "../services/restaurantInfoGetters";
import { employeeCategoryEnum } from "../@types/enums";

const addProductValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    const { name, picture, description, price } = req.body;
    if (!name || !picture || !description || !price) {
        return res.status(400).send("Missing fields");
    }
    next();
};

const deleteProductValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    next();
};

const createMenuValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    const { banner, color } = req.body;
    if (!banner || !color) {
        return res.status(400).send("Missing fields");
    }
    next();
};

const deleteRestaurantValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const [categoryOfUser, restaurantId] = await restaurantCategoryOfUser(
        req.session.restaurantUrl,
        req.session.user.email
    );
    if (isNaN(categoryOfUser as number)) {
        return res.status(401).send("Not authorized");
    }
    if (categoryOfUser !== employeeCategoryEnum.Owner) {
        return res.status(401).send("Not authorized");
    }
    next();
};

export {
    addProductValidation,
    deleteProductValidation,
    createMenuValidation,
    deleteRestaurantValidation,
};
