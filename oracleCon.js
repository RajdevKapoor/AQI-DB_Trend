const oracledb = require('oracledb');
const config = {
	user: 'abhishekredwal',
	password: 'HCDEJlOMWa0sGpst9q68SDuf',
	connectString: 'oracle.cise.ufl.edu/orcl'
};

async function testConnection(empId) {
	let conn;

	try {
		conn = await oracledb.getConnection(config);

		const result = await conn.execute('SELECT COUNT(*) FROM "ABHISHEKREDWAL".Obs', {});

		console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
}

getEmployee(101);
