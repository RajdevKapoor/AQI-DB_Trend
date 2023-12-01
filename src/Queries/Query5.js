import { render } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';
import States from '../Components/States.json';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cleandat } from '../demo';
import Navbar from '../Components/Navbar';

import Footer from '../Components/Footer';
import axios from 'axios';

import { Grid, Box, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function CustomizedLabel(props) {
	const { x, y, fill, value } = props;

	return (
		<text x={x} y={y} dy={-4} dx={20} fontSize="16" fontFamily="sans-serif" fill={fill} textAnchor="middle">
			{value}
		</text>
	);
}

export default function Query5() {
	//     const data = [
	//         {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
	//         {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
	//         {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
	//         {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
	//         {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
	//         {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
	//         {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
	//   ];
	const [ state, setState ] = React.useState('');
	const [ data, setData ] = React.useState([]);

	function handleChange(event) {
		setState(event.target.value);
	}

	function handleclick() {
		let variable = {
			state: state
		};
		axios.post('http://localhost:5000/api/q5', variable).then((response) => {
			console.log(response.data);
			let x = [];
			let cleandat = response.data;
			for (let i = 1; i < response.data.rows.length; i++) {
				console.log(i);
				if (cleandat.rows[i].YEAR1 == 2019) {
					let y = {
						name: cleandat.rows[i].YEAR1,
						Echange: cleandat.rows[i].DIFF_DATA,
						AQIchange: cleandat.rows[i].DIFF_AQI / 100
					};
				} else if (cleandat.rows[i].YEAR1 == 2020) {
					let y = {
						name: cleandat.rows[i].YEAR1,
						Echange: cleandat.rows[i].DIFF_DATA,
						AQIchange: cleandat.rows[i].DIFF_AQI / 8
					};
				} else {
					let y = {
						name: cleandat.rows[i].YEAR1,
						Echange: cleandat.rows[i].DIFF_DATA,
						AQIchange: cleandat.rows[i].DIFF_AQI
					};
					console.log(y);
					x.push(y);
				}
			}

			setData(x);
		});
	}

	return (
		<div>
			<Navbar />
			<center>
				<h1>"Hello"</h1>
			</center>
			<br />
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box m="auto" sx={{ width: 400, marginRight: '30%' }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select a State</InputLabel>
							<Select
								name="st1"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={state}
								label="Select A State"
								onChange={handleChange}
							>
								<MenuItem>Select a State</MenuItem>

								{States && States.map((state) => <MenuItem value={state.name}>{state.name}</MenuItem>)}
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>

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
					<Bar dataKey="Echange" s fill="#8884d8" />
					<Bar dataKey="AQIchange" fill="#82ca9d" />

					<XAxis type="number" orientation="top" />
					<YAxis type="category" dataKey="name" />
				</BarChart>
			</div>

			{/* <Footer/> */}
		</div>
	);
}
