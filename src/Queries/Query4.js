import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';
import States from '../Components/States.json';
import { Grid, Box, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { demographicData, stdata, stdata2 } from '../demo';
import Navbar from '../Components/Navbar';

import React from 'react';

export default function Query4() {
	// const pdata = [
	//     {
	//         name: 'MongoDb',
	//         student: 11,
	//         fees: 120
	//     },
	//     {
	//         name: 'Javascript',
	//         student: 15,
	//         fees: 12
	//     },
	//     {
	//         name: 'PHP',
	//         student: 5,
	//         fees: 10
	//     },
	//     {
	//         name: 'Java',
	//         student: 10,
	//         fees: 5
	//     },
	//     {
	//         name: 'C#',
	//         student: 9,
	//         fees: 4
	//     },
	//     {
	//         name: 'C++',
	//         student: 10,
	//         fees: 8
	//     },
	// ];

	const [ pdata, setPdata ] = React.useState([
		{ name: 2016 },
		{ name: 2017 },
		{ name: 2018 },
		{ name: 2019 },
		{ name: 2020 },
		{ name: 2021 }
	]);

	const [ pollutant, setpol ] = React.useState('');
	const [ states, setStates ] = React.useState([]);
	const [ st1, setst1 ] = React.useState('');
	const [ curr, setcurr ] = React.useState('');
	const [ st3, setst3 ] = React.useState('');
	const [ st4, setst4 ] = React.useState('');
	const [ st5, setst5 ] = React.useState('');

	// function handleChange(event) {
	// 	setState(event.target.value);

	// 	if (event.target.value == 'Alabama') {
	// 		let k = pdata;
	// 		let st = stdata.rows[0].State;
	// 		for (let i = 0; i < 6; i++) {
	// 			k[i] = { ...k[i], [stdata.rows[i].State]: stdata.rows[i].Mean };
	// 		}
	// 		setPdata(k);
	// 	}

	// 	if (event.target.value == 'Florida') {
	// 		let k = pdata;
	// 		let st = stdata2.rows[0].State;
	// 		for (let i = 0; i < 6; i++) {
	// 			k[i] = { ...k[i], [stdata2.rows[i].State]: stdata2.rows[i].Mean };
	// 		}
	// 		setPdata(k);
	// 	}

	// 	console.log(pdata);
	// }

	function handelst1(event) {
		setst1(event.target.value);
		setStates([ ...states, event.target.value ]);
	}

	function handelpol(event) {
		setpol(event.target.value);
	}

	function handleclick() {
		let variable = {
			state: st1,
			pollutant: pollutant
		};

		let k = pdata;

		axios.post('http://localhost:5000/api/q4', variable).then((response) => {
			console.log(response.data);
			for (let i = 0; i < 6; i++) {
				k[i] = { ...k[i], [response.data.rows[i].STATE]: response.data.rows[i].MEANVALUE };
			}
			setPdata(k);
			setcurr('fgh');
		});
	}

	return (
		<div>
			<Navbar />

			<br />
			<br />
			<br />
			<br />
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box m="auto" sx={{ width: 400, marginLeft: '30%' }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select a Pollutant</InputLabel>
							<Select
								name="st1"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={pollutant}
								label="Select A Pollutant"
								onChange={handelpol}
							>
								<MenuItem>Select a Pollutant</MenuItem>

								<MenuItem value="CO">CO</MenuItem>
								<MenuItem value="NO2">NO2</MenuItem>
								<MenuItem value="SO2">SO2</MenuItem>
								<MenuItem value="Ozone">Ozone</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Grid>

				<Grid item xs={6}>
					<Box m="auto" sx={{ width: 400, marginRight: '30%' }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select a State</InputLabel>
							<Select
								name="st1"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={st1}
								label="Select A State"
								onChange={handelst1}
							>
								<MenuItem>Select a State</MenuItem>

								{States && States.map((state) => <MenuItem value={state.name}>{state.name}</MenuItem>)}
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>

			<br />
			<br />

			<Button className="genbut" variant="contained" onClick={handleclick}>
				Add State
			</Button>

			<br />
			<br />
			<div className="line">
				<ResponsiveContainer width="100%" aspect={3}>
					<LineChart data={pdata} margin={{ right: 300 }}>
						{/* <CartesianGrid /> */}
						<XAxis dataKey="name" interval={'preserveStartEnd'} />
						<YAxis />
						<Legend />
						<Tooltip />
						<Line dataKey={states[0]} stroke="black" activeDot={{ r: 8 }} />
						<Line dataKey={states[1]} stroke="red" activeDot={{ r: 8 }} />
						<Line dataKey={states[2]} stroke="blue" activeDot={{ r: 8 }} />
						<Line dataKey={states[3]} stroke="green" activeDot={{ r: 8 }} />
						<Line dataKey={states[4]} stroke="yellow" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
