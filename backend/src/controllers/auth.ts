import { Request, Response } from "express";
// models
import { UserType } from "../@types/modelTypes";
// services
import {
    authenticateUser,
    createUser,
    createRestaurant,
} from "../services/auth";

const loginController = async (req: Request, res: Response) => {
    if (req.session.user) return res.status(200).send("Already logged in");

    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) return res.status(401).send("Invalid credentials");
    req.session.user = user;
    res.status(200).send(user);
};

const logoutController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Not logged in");
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.status(200).send("Logged out");
    });
};

const registerController = async (req: Request, res: Response) => {
    const { name, email, password, restaurantUrl, categoryEnum } = req.body;

    const newUser = await createUser(
        name,
        email,
        password,
        restaurantUrl,
        parseInt(categoryEnum)
    );
    if (!newUser) return res.status(409).send("User already exists");
    req.session.user = newUser;
    res.status(201).send(newUser);
};

const registerRestaurantController = async (req: Request, res: Response) => {
    const {
        name,
        urlSuffix,
        paymentInfo,
        ownerName,
        ownerEmail,
        ownerPassword,
    } = req.body;

    const [restaurant, owner] = await createRestaurant(
        name,
        urlSuffix,
        paymentInfo,
        ownerName,
        ownerEmail,
        ownerPassword
    );
    if (!restaurant || !owner) {
        return res
            .status(409)
            .send("Restaurant with URL suffix already exists");
    }
    req.session.user = owner as UserType;
    res.status(201).send(restaurant);
};

export {
    loginController,
    logoutController,
    registerController,
    registerRestaurantController,
};
