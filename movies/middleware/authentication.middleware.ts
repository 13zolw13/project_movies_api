import { NextFunction, Request, Response } from "express";
import { encodedUser } from "../src/utils/jwt";


const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.signedCookies;

    if (!token) {
        return next();
    }
    console.log('authenticateUser token', token);

    const user = encodedUser(token.toString());

    if (user) {

        res.locals.user = user;
        console.log('authenticateUser ->', user);
    }

    return next();
}


export default authenticateUser