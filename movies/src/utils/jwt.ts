import config from "config";
import jwt from "jsonwebtoken";
import {
    UserJWT
} from "../models/movie.models";
import log from "./logger";


export function encodedUser<T>(token: string): UserJWT | null {

    const key = config.get<string>('jwt')
    log.info(key, ' auth middleware=> encodedUser key')
    log.info(token, ' auth middleware=> encodedUser token');

    try {
			const data = jwt.verify(token, key!) as UserJWT;
			log.info(data, " auth middleware=> encodedUser data");
			return data;
		} catch (error: any) {
			log.error(error, "Error");
			return null;
		}

}

