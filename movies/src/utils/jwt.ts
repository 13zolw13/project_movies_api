import config from "config";
import jwt from "jsonwebtoken";
import { UserJWT } from "../models/UserJWT";
import log from "./logger";


export function encodedUser<T>(token: string): UserJWT | null {
try {
    const key = config.get<string>('jwt')
    log.info(key, ' auth middleware=> encodedUser key')
    log.info(token, ' auth middleware=> encodedUser token');

    
			const data = jwt.verify(token, key!) as UserJWT;
			log.info(data, " auth middleware=> encodedUser data");
			return data;
		} catch (error: any) {
			log.error(error, "Error");
			return null;
		}

}

