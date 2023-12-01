const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
var cors = require('cors');
const config = {
	user: 'abhishekredwal',
	password: 'HCDEJlOMWa0sGpst9q68SDuf',
	connectString: 'oracle.cise.ufl.edu/orcl'
};
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/q3', async function(req, res) {
// 	//res.send({ express: 'Hello From Express' });
// 	let conn;
// 	try {
// 		conn = await oracledb.getConnection(config);

// 		const result = await conn.execute(
// 			'Select year,quarter,round(avg(mean),3) as Meanval from ( SELECT EXTRACT(YEAR FROM TO_DATE(date_local, \'YYYY-MM-DD\')) as Year, EXTRACT(MONTH FROM TO_DATE(date_local, \'YYYY-MM-DD\')) as Month, value as mean, CASE WHEN EXTRACT(MONTH FROM TO_DATE(date_local, \'YYYY-MM-DD\')) between 1 and 3 THEN 'Q1' WHEN EXTRACT(MONTH FROM TO_DATE(date_local, 'YYYY-MM-DD')) between 4 and 6 THEN 'Q2' WHEN EXTRACT(MONTH FROM TO_DATE(date_local, 'YYYY-MM-DD')) between 7 and 9 THEN 'Q3' WHEN EXTRACT(MONTH FROM TO_DATE(date_local, 'YYYY-MM-DD')) between 10 and 12 THEN 'Q4' END as quarter FROM ( SELECT value, date_local FROM \"SINHA.KSHITIJ\".observation o WHERE ( o.parameter_name = ( SELECT id FROM \"SINHA.KSHITIJ\".pollutants p WHERE ( p.name = 'Ozone' ) ) ) AND ( o.local_site_name in ( SELECT local_site_name FROM ( SELECT local_site_name FROM \"SINHA.KSHITIJ\".STATE Natural JOIN \"SINHA.KSHITIJ\".COUNTY JOIN \"SINHA.KSHITIJ\".LOCATION loc on (loc.county_code = county.county_code) AND (loc.county_name = county.county_name) WHERE state_name = 'Florida' ) ) )) ) group by quarter,year order by year,quarter;',
// 			{},
// 			{
// 				outFormat: oracledb.OBJECT
// 			}
// 		);

// 		res.send(JSON.stringify(result));
// 		//console.log(result);
// 	} catch (err) {
// 		console.log('Ouch!', err);
// 	} finally {
// 		if (conn) {
// 			// conn assignment worked, need to close
// 			await conn.close();
// 		}
// 	}
// });

// app.get('/api/q3', async function(req, res) {
// 	//res.send({ express: 'Hello From Express' });
// 	let conn;
// 	try {
// 		conn = await oracledb.getConnection(config);

// 		const result = await conn.execute(
// 			'Select count(*) from "SINHA.KSHITIJ".county',
// 			{},
// 			{
// 				outFormat: oracledb.OBJECT
// 			}
// 		);

// 		res.send(JSON.stringify(result));
// 		//console.log(result);
// 	} catch (err) {
// 		console.log('Ouch!', err);
// 	} finally {
// 		if (conn) {
// 			// conn assignment worked, need to close
// 			await conn.close();
// 		}
// 	}
// });

// app.get('/api/q4', async function(req, res) {
// 	//res.send({ express: 'Hello From Express' });
// 	let conn;
// 	try {
// 		conn = await oracledb.getConnection(config);

// 		const result = await conn.execute(
// 			'SELECT EXTRACT(YEAR FROM TO_DATE(date_local, \'YYYY-MM-DD\')) as year, state_name AS state, round(Avg(value), 3) AS meanValue FROM ( SELECT * FROM "SINHA.KSHITIJ".observation o WHERE ( o.parameter_name = ( SELECT id FROM "SINHA.KSHITIJ".pollutants p WHERE (p.name = \'Ozone\') ) ) AND ( o.local_site_name IN ( SELECT local_site_name FROM ( SELECT local_site_name FROM "SINHA.KSHITIJ".STATE Natural JOIN "SINHA.KSHITIJ".COUNTY JOIN "SINHA.KSHITIJ".LOCATION loc on (loc.county_code = county.county_code) AND (loc.county_name = county.county_name) WHERE state_name = \'Florida\' ) ) ) )NATURAL JOIN "SINHA.KSHITIJ".State GROUP BY EXTRACT(YEAR FROM TO_DATE(date_local, \'YYYY-MM-DD\')), state_name ORDER BY state_name;',
// 			{},
// 			{
// 				outFormat: oracledb.OBJECT
// 			}
// 		);

// 		res.send(JSON.stringify(result));
// 		//console.log(result);
// 	} catch (err) {
// 		console.log('Ouch!', err);
// 	} finally {
// 		if (conn) {
// 			// conn assignment worked, need to close
// 			await conn.close();
// 		}
// 	}
// // });

app.get('/api/q2', async function(req, res) {
	//res.send({ express: 'Hello From Express' });
	let conn;
	try {
		conn = await oracledb.getConnection(config);

		const result = await conn.execute(
			`SELECT  rs.year, rs.Rank, rs.state, rs.city_name, rs.totVal FROM(
				SELECT
				year,
				state,
					city_name,
					totVal,
					RANK()
					Over (
						PARTITION BY year
						Order By
							totVal asc
					) as Rank
				FROM
					(
						SELECT
							 EXTRACT(YEAR FROM TO_DATE(o.date_local, 'YYYY-MM-DD')) as year,
							 c.city_name,
							 s.state_name as state,
							 avg(value)+1 as totVal
							   
						   
						FROM
							(
								"SINHA.KSHITIJ".Observation o
								JOIN "SINHA.KSHITIJ".Pollutants p on o.parameter_name = p.id
								JOIN "SINHA.KSHITIJ".County c on (c.state_code = o.state_code) AND (c.county_code = o.county_code)
								JOIN "SINHA.KSHITIJ".State s on s.state_code = c.state_code
							)
						WHERE
							p.Name IN ('CO', 'NO2', 'SO2', 'Ozone')
						Group by
							EXTRACT(YEAR FROM TO_DATE(o.date_local, 'YYYY-MM-DD')), c.city_name, s.state_name
			)) rs
			WHERE Rank<=5`,
			{},
			{
				outFormat: oracledb.OBJECT
			}
		);

		res.send(JSON.stringify(result));
		//console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
});

app.get('/api/q21', async function(req, res) {
	//res.send({ express: 'Hello From Express' });
	let conn;
	try {
		conn = await oracledb.getConnection(config);

		const result = await conn.execute(
			'SELECT COUNT(*) from "SINHA.KSHITIJ".observation',
			{},
			{
				outFormat: oracledb.OBJECT
			}
		);

		res.send(JSON.stringify(result));
		//console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
});

app.post('/api/q1', async function(req, res) {
	//res.send({ express: 'Hello From Express' });
	let conn;
	try {
		conn = await oracledb.getConnection(config);
		let st = req.body.state;

		// let pol = req.pollutant;
		// console.log(req.body.pollutant);
		const result = await conn.execute(
			`SELECT month, year+2000 as year, count(dated) AS Count FROM( SELECT
				month,
				year,
				dateD,
				COUNT(avgaqi) AS AvgAQI
			FROM
				(
					SELECT
						EXTRACT(YEAR FROM to_date(datelocal, 'DD-MM-YYYY'))  AS year,
							-- dateData.dateid,
						EXTRACT(MONTH FROM to_date(datelocal, 'DD-MM-YYYY')) AS month,
						aqidata.aqi               as                       avgaqi,
						datelocal as dateD
					FROM
						(
							SELECT
								datelocal,
								aqi
							   
							FROM
								"ABHISHEKREDWAL".OBS o
							WHERE
								( o.localsitename IN (
									SELECT
										localsitename
									FROM
										(
											SELECT
												localsitename
											FROM
													 "ABHISHEKREDWAL".state
												NATURAL JOIN "ABHISHEKREDWAL".county -- county ON county.statecode = state.statecode
												JOIN "ABHISHEKREDWAL".location loc ON ( loc.countycode = county.countycode )
																					 AND ( loc.countyname = county.countyname ) ---loc ON loc.countycode = county.countycode
											WHERE
												statename = :state
										)
								) ) 
						) aqidata
				)
			WHERE
				avgaqi >= :threshold
			GROUP BY
				month,
				year,
				dateD
			Order BY year, month
			) WHERE avgAQI >4
			GROUP BY year, month
			order by year, month`,
			[ req.body.state, parseInt(req.body.threshold) ],
			{
				outFormat: oracledb.OBJECT
			}
		);

		res.send(JSON.stringify(result));
		console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
});

app.post('/api/q3', async function(req, res) {
	//res.send({ express: 'Hello From Express' });
	let conn;
	try {
		conn = await oracledb.getConnection(config);
		let st = req.state;
		let pol = req.pollutant;
		console.log(req.body.pollutant);
		const result = await conn.execute(
			`Select year,quarter,round(avg(mean),3) as Meanval
			from
			(
			 SELECT 
				 EXTRACT(YEAR FROM TO_DATE(datelocal, 'DD-MM-YYYY')) as Year,
				 EXTRACT(MONTH FROM TO_DATE(datelocal, 'DD-MM-YYYY')) as Month,
				 ARITHMETICMEAN as mean,
				
				 CASE
							WHEN  EXTRACT(MONTH FROM TO_DATE(datelocal, 'DD-MM-YYYY')) between 1 and 3 THEN 'Q1'
							WHEN  EXTRACT(MONTH FROM TO_DATE(datelocal, 'DD-MM-YYYY')) between 4 and 6 THEN 'Q2'
							WHEN  EXTRACT(MONTH FROM TO_DATE(datelocal, 'DD-MM-YYYY')) between 7 and 9 THEN 'Q3'
							WHEN  EXTRACT(MONTH FROM TO_DATE(datelocal, 'DD-MM-YYYY')) between 10 and 12 THEN 'Q4'
						END  as quarter
				
			
			FROM
						( SELECT
					   ARITHMETICMEAN, datelocal
				   FROM
					   "ABHISHEKREDWAL".obs o
				   WHERE
					   ( o.parametername = (
						   SELECT
							   id
						   FROM
							   "ABHISHEKREDWAL".pollutants p
						   WHERE
							   ( p.name = :pollutant )
					   ) )
					   AND ( o.localsitename in (
						   SELECT
							   localsitename
						   FROM
							   (
								   SELECT
									  localsitename
								   FROM
										"ABHISHEKREDWAL".STATE 
									   Natural JOIN "ABHISHEKREDWAL".COUNTY  -- county ON county.state_code = state.state_code
									   JOIN "ABHISHEKREDWAL".LOCATION loc on (loc.countycode = county.countycode) AND (loc.countyname = county.countyname) ---loc ON loc.county_code = county.county_code
								   WHERE
									   statename = :state
							   )
					   ) )) )
					   group by quarter,year
					   order by year,quarter`,
			[ req.body.pollutant, req.body.state ],
			{
				outFormat: oracledb.OBJECT
			}
		);

		res.send(JSON.stringify(result));
		console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
});

app.post('/api/q4', async function(req, res) {
	//res.send({ express: 'Hello From Express' });
	let conn;
	try {
		conn = await oracledb.getConnection(config);

		const result = await conn.execute(
			`SELECT
			EXTRACT(YEAR FROM TO_DATE(datelocal, 'DD-MM-YYYY')) as year, statename AS state,
			round(Avg(aqi), 3) AS meanValue
		FROM
			(
				SELECT
					*
				FROM
					"ABHISHEKREDWAL".obs o
				WHERE
					(
						o.parametername = (
							SELECT
								id
							FROM
								"ABHISHEKREDWAL".pollutants p
							WHERE
								(p.name = :pollutant)
						)
					)
					AND (
						o.localsitename IN (
					   SELECT
						   localsitename
					   FROM
						   (
							   SELECT
								  localsitename
							   FROM
									"ABHISHEKREDWAL".STATE 
								   Natural JOIN "ABHISHEKREDWAL".COUNTY  -- county ON county.state_code = state.state_code
								   JOIN "ABHISHEKREDWAL".LOCATION loc on (loc.countycode = county.countycode) AND (loc.countyname = county.countyname) ---loc ON loc.county_code = county.county_code
							   WHERE
								   statename = :state
						   )
				   
					)
			) )data JOIN "ABHISHEKREDWAL".State on "ABHISHEKREDWAL".State.statecode = data.statecode and "ABHISHEKREDWAL".State.statename = :state
		
		GROUP BY
			EXTRACT(YEAR FROM TO_DATE(datelocal, 'DD-MM-YYYY')), statename
		ORDER BY year, state`,
			[ req.body.pollutant, req.body.state ],
			{
				outFormat: oracledb.OBJECT
			}
		);

		res.send(JSON.stringify(result));
		//console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
});

app.post('/api/q5', async function(req, res) {
	//res.send({ express: 'Hello From Express' });
	let conn;
	try {
		conn = await oracledb.getConnection(config);

		const result = await conn.execute(
			`SELECT
			year1,
			state1,
			data,
			round(((data - LAG(data)
						   OVER(PARTITION BY state1
								ORDER BY
									year1
			)) / data) * 100, 3) AS diff_data,
			aqi,
			round(((aqi - LAG(aqi)
						  OVER(PARTITION BY state1
							   ORDER BY
								   year1
			)) / aqi) * 100, 3)  AS diff_aqi
		FROM
			(
				SELECT
					elec.year                                                AS year1,
					statename                                               AS state1,
					round(AVG(nameplate_capacity) + AVG(summer_capacity), 3) AS data,
					aqi
				FROM
						 "ABHISHEKREDWAL".Electricity1 elec
					JOIN (
						SELECT
							EXTRACT(YEAR FROM to_date(o.datelocal, 'DD-MM-YYYY')) AS year,
							s.statecode,
							s.statename,
							round(AVG("ABHISHEKREDWAL".o.aqi), 3)                   AS aqi
						FROM
								 "ABHISHEKREDWAL".obs o
							JOIN state s ON s.statecode = o.statecode
						WHERE
							statename = :state
						GROUP BY
							EXTRACT(YEAR FROM to_date(o.datelocal, 'DD-MM-YYYY')),
							s.statecode,
							s.statename
						ORDER BY
							EXTRACT(YEAR FROM to_date(o.datelocal, 'DD-MM-YYYY')),
							s.statecode,
							s.statename
					) aqidata ON aqidata.statecode = elec.statecode
								 AND elec.year = aqidata.year
				WHERE
					fuelsource NOT IN ( 'Hydroelectric', 'Solar Thermal and Photovoltaic' )
					AND statename = :state
				GROUP BY
					elec.year,
					statename,
					aqi
				ORDER BY
					elec.year,
					statename,
					aqi
			)`,
			[ req.body.state, req.body.state ],
			{
				outFormat: oracledb.OBJECT
			}
		);

		res.send(JSON.stringify(result));
		//console.log(result);
	} catch (err) {
		console.log('Ouch!', err);
	} finally {
		if (conn) {
			// conn assignment worked, need to close
			await conn.close();
		}
	}
});

app.listen(port, () => console.log(`Listening on port ${port}`));
