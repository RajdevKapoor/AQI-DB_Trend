require('dotenv').config();

module.exports = {
	user: 'abhishekredwal',

	password: 'HCDEJlOMWa0sGpst9q68SDuf',

	connectionString: 'localhost/XE',

	externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
