import {
    NextFunction,
    Request,
    Response
} from "express";
import {
    encodedUser
} from "../utils/jwt";
import log from "../utils/logger";


const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.cookies;

	if (!token) {
		return next();
	}
	log.info(token, "middleware-> authenticateUser token");

	const user = await encodedUser(token.toString());
	log.info(user, "middleware-> user");
	if (user) {
		res.locals.user = user;
	}
	return next();
};

export default authenticateUser;