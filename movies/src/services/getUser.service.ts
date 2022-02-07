import axios from 'axios';
import config from 'config';
import log from '../utils/logger';


export async function getAuthUser(username: string, password: string) {
    const url = config.get < string > ('authServiceURL');
    log.info('url auth service', url);
    try {
        const data = await axios.post(url, {
            username: username,
            password: password
        });
        log.info('data getAuth', data.data);
        return data.data.token;
    } catch (error: any) {
        log.error(error);
        return;
    }
}