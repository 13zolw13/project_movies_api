import config from "config";
import jwt from "jsonwebtoken";


export function encodedUser < T > (token: string): T | null {
    const key = config.get < string > ('jwt');
  const data = jwt.verify(token, key!) as T;

    if (data) {

        return data;
    } else {

        return null;
    }

}