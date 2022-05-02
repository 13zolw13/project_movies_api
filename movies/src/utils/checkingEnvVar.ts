import config from 'config';
import log from './logger';
 const ArrayOfEnvVar = [
		"dbUri",
		"jwt",
		"level",
		"limitBasic",
		"authServiceURL",
		"omdb_key",
		"apiUrl",
 ];
 export default function checkEnvVar() {
	ArrayOfEnvVar.forEach((envVar) => {
		if (!config.has(envVar)) {
			throw new Error(`${envVar} is not defined`);
		} else {
			log.info(`${envVar} is defined`);
		}
	});
}
 
 

