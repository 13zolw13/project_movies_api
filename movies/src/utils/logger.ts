import config from "config";
import dayjs from "dayjs";
import logger from "pino";

const level = config.get<string>("level");

const log = logger({
	transport: {
		target: "pino-pretty",
	},
	level,
	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
