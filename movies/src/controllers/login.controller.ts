import {
    Request,
    Response
} from "express";
import {
    LoginInput
} from "../schemas/login.schema";
import {
    getAuthUser
} from "../services/getUser.service";
import log from "../utils/logger";
export async function loginUser(req: Request < {}, {},LoginInput > , res: Response) {
    const {

        username,
        password
    } = req.body;

    const token = await getAuthUser(username, password)

    if (!token) {
        res.locals.user = '';
        return res.status(403).clearCookie('token').send('User not authorized');
    }
    log.info(token, 'get auth login');
    return res.status(200).cookie('token', token, ).send({
        msg: 'User login!'
    });


}