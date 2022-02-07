import config from "config";
import jwt from "jsonwebtoken";
import {
    UserJWT
} from "../models/movie.models";
import log from "./logger";


export function encodedUser < T > (token: string): UserJWT | null {
    const key = config.get < string > ('jwt');
    log.info(' auth middleware=> encodedUser key', key)
    log.info(' auth middleware=> encodedUser token', token);
    try {
        const data = jwt.verify(token, key!) as UserJWT;
        log.info(' auth middleware=> encodedUser data', data)
        return data;
    } catch (error:any) {
        log.error('Error', error.code)
        return null;
    }
    // if (data) {

    //     return data;
    // } else {

    //     return null;
    // }

}