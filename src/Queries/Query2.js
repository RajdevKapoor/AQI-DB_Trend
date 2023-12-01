import { render } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cleandat } from '../demo';
import Navbar from '../Components/Navbar';
import Button from '@mui/material/Button';
import Footer from '../Components/Footer';

function CustomizedLabel(props) {
	const { x, y, fill, value } = props;

	return (
		<text x={x} y={y} dy={-4} dx={20} fontSize="16" fontFamily="sans-serif" fill={fill} textAnchor="middle">
			{value}
		</text>
	);
}

export default function Query2() {
	//     const data = [
	//         {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
	//         {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
	//         {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
	//         {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
	//         {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
	//         {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
	//         {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
	//   ];

	const [ data, setData ] = React.useState([]);

	function handleclick() {
		let x = [];

		for (let i = 0; i < cleandat.rows.length; i += 5) {
			if (
				i + 2 > cleandat.rows.length ||
				i + 1 > cleandat.rows.length ||
				i + 3 > cleandat.rows.length ||
				i + 4 > cleandat.rows.length ||
				i + 5 > cleandat.rows.length
			) {
				break;
			}
			console.log(i);
			let y = {
				name: cleandat.rows[i].YEAR,
				City1: cleandat.rows[i].TOTVAL,
				City2: cleandat.rows[i + 1].TOTVAL,
				City3: cleandat.rows[i + 2].TOTVAL,
				City4: cleandat.rows[i + 3].TOTVAL,
				City5: cleandat.rows[i + 4].TOTVAL,
				c1: cleandat.rows[i].CITY_NAME + '--' + cleandat.rows[i].STATE,
				c2: cleandat.rows[i + 1].CITY_NAME + '--' + cleandat.rows[i + 1].STATE,
				c3: cleandat.rows[i + 2].CITY_NAME + '--' + cleandat.rows[i + 2].STATE,
				c4: cleandat.rows[i + 3].CITY_NAME + '--' + cleandat.rows[i + 3].STATE,
				c5: cleandat.rows[i + 4].CITY_NAME + '--' + cleandat.rows[i + 4].STATE
			};
			console.log(y);
			x.push(y);
		}

		setData(x);
	}

	return (
		<div>
			<Navbar />
			<center>
				<h1>"Hello"</h1>
			</center>
			<br />
			<br />
			<br />
			<br />

			<Button className="genbut" onClick={handleclick} variant="contained">
				Generate
			</Button>

			<div className="grouped">
				<BarChart
					width={1000}
					height={1000}
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					m="auto"
					layout="vertical"
				>
					<Tooltip />
					<Legend />
					<Bar dataKey="City1" s fill="#8884d8">
						<LabelList dataKey="c1" position="insideRight" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="City2" fill="#82ca9d">
						{' '}
						<LabelList dataKey="c2" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="City3" fill="orange">
						<LabelList dataKey="c3" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="City4" fill="blue">
						<LabelList dataKey="c4" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="City5" fill="green">
						<LabelList dataKey="c5" position="inside" style={{ fill: 'white' }} />
					</Bar>

					<XAxis type="number" orientation="top" />
					<YAxis type="category" dataKey="name" />
				</BarChart>
			</div>

			{/* <Footer/> */}
		</div>
	);
}
