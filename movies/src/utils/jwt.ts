import config from "config";
import jwt from "jsonwebtoken";
import { UserJWT } from "../models/movie.models";


export function encodedUser<T>(token: string): UserJWT | null {
    const key = config.get<string>('jwt');
    console.log(' auth middleware=> encodedUser key', key)
    console.log(' auth middleware=> encodedUser token', token);
    const data = jwt.verify(token, key!) as UserJWT;
    console.log(' auth middleware=> encodedUser data', data)
    if (data) {

        return data;
    } else {

        return null;
    }

}