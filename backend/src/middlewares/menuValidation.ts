import { Request, Response, NextFunction } from "express";
import { checkUserPermissions } from "../services/restaurantInfoGetters";

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

export { createMenuValidation };
