import {
    NextFunction,
    Request,
    Response
} from "express";
import { CustomError, ErrorStatus } from "../models/custom-error.models";


export const authUser = (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.signedCookies;

	const User = res.locals.user;

	if (!token && !User) {
		throw new CustomError(ErrorStatus.NotAuth, "Forbidden");
	}
	return next();
};
