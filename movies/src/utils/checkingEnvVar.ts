import config from 'config';
import log from './logger';
function checkEnvVar() {
    
    if (!config.has('port')) {
        log.error('No port variable');
    }
    if (!config.has('dbUri')) {
        log.error('No dbUri variable');
    }
    if (!config.has('cookieKey')) {
        log.error('No cookieKey variable');
    }
    if (!config.has('omdb_key')) {
        log.error('No omdb_key variable');
    }
    if (!config.has('apiUrl')) {
        log.error('No omdb_key variable');
    }
    if (!config.has('level')) {
        log.error('No level variable');
    }
    if (!config.has('limitBasic')) {
        log.error('No limitBasic variable');
    }
    if (!config.has('authServiceURL')) {
        log.error('No authServiceURL variable');
    }
    if (!config.has('jwt')) {
        log.error('No  jwt key variable');
    }
}


export default checkEnvVar;