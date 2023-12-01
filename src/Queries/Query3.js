import React from 'react';
import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';
import { Data } from '../Utils/Data';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Grid, Box, Tooltip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import States from '../Components/States.json';
import { demographicData } from '../demo';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Query3() {
	const [ state, setState ] = React.useState('');
	const [ pollutant, setpol ] = React.useState('');
	const [ data, setData ] = React.useState([]);
	const [ demo, setdemo ] = React.useState([]);

	// useEffect(
	// 	() => {

	// 		console.log('Hello');
	// 	},
	// 	[ state, pollutant ]
	// );

	useState(() => {
		setdemo(demographicData);
	});
	// const data = [
	//   {name: 2021, students: 400},
	//   {name: 'Technical scripter', students: 700},
	//   {name: 'Geek-i-knack', students: 200},
	//   {name: 'Geek-o-mania', students: 1000}

	//   ];

	function handlerequest() {
		console.log('sfhf');

		let variable = {
			state: state,
			pollutant: pollutant
		};
		axios.post('http://localhost:5000/api/q3', variable).then((response) => {
			console.log(response.data);
			let x = [];

			for (let i = 0; i < response.data.rows.length; i += 4) {
				if (i + 3 > response.data.rows.length || i + 3 > demo.rows.length || i + 1 > demo.rows.length) {
					break;
				}

				let y = {
					name: response.data.rows[i].YEAR,
					Q1: response.data.rows[i].MEANVAL,
					Q2: response.data.rows[i + 1].MEANVAL,
					Q3: response.data.rows[i + 2].MEANVAL,
					Q4: response.data.rows[i + 3].MEANVAL
				};

				x.push(y);
			}
			setData(x);
			console.log(x);
		});
	}

	function handleChange(event) {
		setState(event.target.value);
	}

	function handleChangep(event) {
		setpol(event.target.value);
	}

	return (
		<div>
			<Navbar />
			<center>
				<h1>"Hello"</h1>
			</center>
			<br />
			<br />

			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Box sx={{ width: 400, marginLeft: '30%' }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select a State</InputLabel>
							<Select
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

				<Grid item xs={6}>
					<Box m="auto" sx={{ width: 400, marginRight: '30%' }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select Pollutant</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={pollutant}
								label="Select Pollutant"
								onChange={handleChangep}
							>
								<MenuItem value={'CO'}>CO</MenuItem>
								<MenuItem value={'SO2'}>SO2</MenuItem>
								<MenuItem value={'NO2'}>NO2</MenuItem>
								<MenuItem value={'Ozone'}>Ozone</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>

			<div>
				<Button className="genbut" m="auto" variant="contained" onClick={handlerequest}>
					Generate
				</Button>
			</div>
			<br />
			<Button className="genbut" m="auto" variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
				Q1
			</Button>
			<Button className="genbut" m="auto" variant="contained" style={{ backgroundColor: 'blue', color: 'white' }}>
				Q2
			</Button>
			<Button
				className="genbut"
				m="auto"
				variant="contained"
				style={{ backgroundColor: 'Green', color: 'white' }}
			>
				Q3
			</Button>
			<Button
				className="genbut"
				m="auto"
				variant="contained"
				style={{ backgroundColor: 'yellow', color: 'white' }}
			>
				Q4
			</Button>
			<div className="grouped">
				<BarChart width={700} height={400} data={data} barSize={50}>
					<Bar dataKey="Q1" stackId="a" fill="red" />
					<Bar dataKey="Q2" stackId="b" fill="blue" />
					<Bar dataKey="Q3" stackId="c" fill="Green" />
					<Bar dataKey="Q4" stackId="d" fill="yellow" />
					<Tooltip />

					<XAxis dataKey="name" />
					<YAxis />
				</BarChart>
			</div>
		</div>
	);
}
