import axios from 'axios';
import config from 'config';
import log from '../utils/logger';


export async function getAuthUser(username: string, password: string) {
    const url = config.get < string > ('authServiceURL');
    log.info(url, 'url auth service');
    try {
        const data = await axios.post(url, {
            username: username,
            password: password
        });
        log.info(data.data,'data getAuth' );
        return data.data.token;
    } catch (error: any) {
        log.error(error);
        return;
    }
}