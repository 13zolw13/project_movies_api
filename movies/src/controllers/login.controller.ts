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
    const token = await getAuthUser(req.body);

    if (!token) {
        res.locals.user = '';
        return res.status(403).clearCookie('token').send('User not authorized');
    }
    log.info(token, 'get auth login');
    return res.status(200).cookie('token', token, ).send({
        msg: 'User login!'
    });


}