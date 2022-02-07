import {
    Request,
    Response
} from "express";
import {
    getAuthUser
} from "../services/getUser.service";
import log from "../utils/logger";
export async function loginUser(req: Request, res: Response) {
    const {

        username,
        password
    } = req.body;

    const token = await getAuthUser(username, password)

    if (!token) {
        res.locals.user = '';

        return res.status(404).clearCookie('token').send('User not authorized');
    }
    log.info('get auth login', token);
    return res.status(201).cookie('token', token, ).send({
        msg: 'User login!'
    });


}