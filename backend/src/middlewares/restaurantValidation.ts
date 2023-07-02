import { Request, Response, NextFunction } from "express";
import { checkUserPermissions } from "../services/restaurantInfoGetters";
import { deleteProductById } from "../services/products";

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

    const { productId } = req.params;
    if (productId) {
        try {
            const result = await deleteProductById(productId);
            if (!result.acknowledged)
                return res.status(400).send("Invalid product id");
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send("Invalid product id");
        }
    }
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

export { addProductValidation, deleteProductValidation, createMenuValidation };
