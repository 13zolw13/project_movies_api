import { NextFunction, Request, Response } from "express";
import { encodedUser } from "../src/utils/jwt";


const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.cookies;

    if (!token) {
        return next();
    }
    console.log('middleware-> authenticateUser token', token);

    const user = encodedUser(token.toString());
    console.log("middleware-> user", user)
    if (user) {
        console.log('authmiddleware -> authenticateUser ->', user);
        res.locals.user = user;

    }

    return next();
}


export default authenticateUser