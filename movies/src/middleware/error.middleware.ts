import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/custom-error.models";

function handleError(
	err: TypeError | CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	let customError = err;

	if (!(err instanceof CustomError)) {
		customError = new CustomError();
	}

	res.status((customError as CustomError).status).send(customError);
}

export default handleError;
