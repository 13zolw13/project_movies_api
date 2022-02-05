import {
    Request,
    Response
} from "express";
import {
    getAuthUser
} from "../services/getUser.service";
export async function loginUser(req: Request, res: Response) {
    const {

        username,
        password
    } = req.body;

    const token = await getAuthUser(username, password)

    if (!token) {

        return res.status(404).clearCookie('token').send('User not authorized');
    }
    console.log('get auth login', token);
    return res.status(201).cookie('token', token, {
        signed: true
    }).send({ msg: 'User login!' });


}