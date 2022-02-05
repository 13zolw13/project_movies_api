import {
    NextFunction,
    Request,
    Response
} from "express";
import { getAuthUser } from "../src/services/getUser.service";


const authUser = async (req: Request, res: Response, next: NextFunction) => {

    const {
        token
    } = req.signedCookies;





    const User  = res.locals.user;
   

    if (!token && !User) {
        res.sendStatus(403);
    }
    return next();

}

export default authUser;