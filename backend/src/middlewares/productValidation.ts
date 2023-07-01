import { Request, Response, NextFunction } from "express";
import { checkUserPermissions } from "../services/restaurantInfoGetters";

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

export { addProductValidation };
