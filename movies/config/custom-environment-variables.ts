require("dotenv").config();
export default {
	dbUri: process.env.DB_URI,
	omdb_key: process.env.OMDB_KEY,
	jwt: process.env.JWT_SECRET,
	cookieKey: process.env.COOKIE_KEY,
};
