import axios from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken';

export async function getAuthUser(username: string, password: string) {
    const url = config.get<string>('authServiceURL');
    console.log('url auth service', url);
    try {
        const data = await axios.post(url, {
            username: username,
            password: password
        });
        console.log('data getAuth', data.data);
        return data.data.token;
    } catch (error: any) {
        console.error(error);
        return;
    }
}