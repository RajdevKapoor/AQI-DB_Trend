import {
	LineChart,
	ResponsiveContainer,
	LabelList,
	Legend,
	Tooltip,
	Line,
	XAxis,
	YAxis,
	CartesianGrid
} from 'recharts';
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

export default function Query1() {
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

	const yrmap = { 1: 2015, 2: 2016, 3: 2017, 4: 2018, 5: 2019, 6: 2020 };
	const monmap = {
		1: 'JAN',
		2: 'FEB',
		3: 'MAR',
		4: 'APR',
		5: 'MAY',
		6: 'JUN',
		7: 'JUL',
		8: 'AUG',
		9: 'SEP',
		10: 'OCT',
		11: 'NOV',
		12: 'DEC'
	};
	const [ pdata, setPdata ] = React.useState([
		{ name: '2015-JAN' },
		{ name: '2015-FEB' },
		{ name: '2015-MAR' },
		{ name: '2015-APR' },
		{ name: '2015-MAY' },
		{ name: '2015-JUN' },
		{ name: '2015-JUL' },
		{ name: '2015-AUG' },
		{ name: '2015-SEP' },
		{ name: '2015-OCT' },
		{ name: '2015-NOV' },
		{ name: '2015-DEC' },
		{ name: '2016-JAN' },
		{ name: '2016-FEB' },
		{ name: '2016-MAR' },
		{ name: '2016-APR' },
		{ name: '2016-MAY' },
		{ name: '2016-JUN' },
		{ name: '2016-JUL' },
		{ name: '2016-AUG' },
		{ name: '2016-SEP' },
		{ name: '2016-OCT' },
		{ name: '2016-NOV' },
		{ name: '2016-DEC' },
		{ name: '2017-JAN' },
		{ name: '2017-FEB' },
		{ name: '2017-MAR' },
		{ name: '2017-APR' },
		{ name: '2017-MAY' },
		{ name: '2017-JUN' },
		{ name: '2017-JUL' },
		{ name: '2017-AUG' },
		{ name: '2017-SEP' },
		{ name: '2017-OCT' },
		{ name: '2017-NOV' },
		{ name: '2017-DEC' },
		{ name: '2018-JAN' },
		{ name: '2018-FEB' },
		{ name: '2018-MAR' },
		{ name: '2018-APR' },
		{ name: '2018-MAY' },
		{ name: '2018-JUN' },
		{ name: '2018-JUL' },
		{ name: '2018-AUG' },
		{ name: '2018-SEP' },
		{ name: '2018-OCT' },
		{ name: '2018-NOV' },
		{ name: '2018-DEC' },
		{ name: '2019-JAN' },
		{ name: '2019-FEB' },
		{ name: '2019-MAR' },
		{ name: '2019-APR' },
		{ name: '2019-MAY' },
		{ name: '2019-JUN' },
		{ name: '2019-JUL' },
		{ name: '2019-AUG' },
		{ name: '2019-SEP' },
		{ name: '2019-OCT' },
		{ name: '2019-NOV' },
		{ name: '2019-DEC' },
		{ name: '2020-JAN' },
		{ name: '2020-FEB' },
		{ name: '2020-MAR' },
		{ name: '2020-APR' },
		{ name: '2020-MAY' },
		{ name: '2020-JUN' },
		{ name: '2020-JUL' },
		{ name: '2020-AUG' },
		{ name: '2020-SEP' },
		{ name: '2020-OCT' },
		{ name: '2020-NOV' },
		{ name: '2020-DEC' }
	]);

	let tempdat = [
		{ name: '2015-JAN' },
		{ name: '2015-FEB' },
		{ name: '2015-MAR' },
		{ name: '2015-APR' },
		{ name: '2015-MAY' },
		{ name: '2015-JUN' },
		{ name: '2015-JUL' },
		{ name: '2015-AUG' },
		{ name: '2015-SEP' },
		{ name: '2015-OCT' },
		{ name: '2015-NOV' },
		{ name: '2015-DEC' },
		{ name: '2016-JAN' },
		{ name: '2016-FEB' },
		{ name: '2016-MAR' },
		{ name: '2016-APR' },
		{ name: '2016-MAY' },
		{ name: '2016-JUN' },
		{ name: '2016-JUL' },
		{ name: '2016-AUG' },
		{ name: '2016-SEP' },
		{ name: '2016-OCT' },
		{ name: '2016-NOV' },
		{ name: '2016-DEC' },
		{ name: '2017-JAN' },
		{ name: '2017-FEB' },
		{ name: '2017-MAR' },
		{ name: '2017-APR' },
		{ name: '2017-MAY' },
		{ name: '2017-JUN' },
		{ name: '2017-JUL' },
		{ name: '2017-AUG' },
		{ name: '2017-SEP' },
		{ name: '2017-OCT' },
		{ name: '2017-NOV' },
		{ name: '2017-DEC' },
		{ name: '2018-JAN' },
		{ name: '2018-FEB' },
		{ name: '2018-MAR' },
		{ name: '2018-APR' },
		{ name: '2018-MAY' },
		{ name: '2018-JUN' },
		{ name: '2018-JUL' },
		{ name: '2018-AUG' },
		{ name: '2018-SEP' },
		{ name: '2018-OCT' },
		{ name: '2018-NOV' },
		{ name: '2018-DEC' },
		{ name: '2019-JAN' },
		{ name: '2019-FEB' },
		{ name: '2019-MAR' },
		{ name: '2019-APR' },
		{ name: '2019-MAY' },
		{ name: '2019-JUN' },
		{ name: '2019-JUL' },
		{ name: '2019-AUG' },
		{ name: '2019-SEP' },
		{ name: '2019-OCT' },
		{ name: '2019-NOV' },
		{ name: '2019-DEC' },
		{ name: '2020-JAN' },
		{ name: '2020-FEB' },
		{ name: '2020-MAR' },
		{ name: '2020-APR' },
		{ name: '2020-MAY' },
		{ name: '2020-JUN' },
		{ name: '2020-JUL' },
		{ name: '2020-AUG' },
		{ name: '2020-SEP' },
		{ name: '2020-OCT' },
		{ name: '2020-NOV' },
		{ name: '2020-DEC' }
	];

	const [ threshold, setThreshold ] = React.useState('');
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
		setThreshold(event.target.value);
	}

	function handleclick() {
		let variable = {
			state: st1,
			threshold: threshold
		};
		setPdata(tempdat);
		let k = pdata;

		axios.post('http://localhost:5000/api/q1', variable).then((response) => {
			console.log(response.data.YEAR);

			let m = 0;
			let n = 0;
			for (let i = 1; i <= 6; i++) {
				for (let j = m; j < m + 12; j++) {
					let t = j % 12;
					console.log(yrmap[i]);
					if (
						n < response.data.rows.length &&
						response.data.rows[n].MONTH == t + 1 &&
						response.data.rows[n].YEAR == yrmap[i]
					) {
						k[j] = { ...k[j], [st1]: response.data.rows[n].COUNT, mon: monmap[t + 1] };
						n++;
					} else {
						k[j] = { ...k[j], [st1]: 0, mon: monmap[t + 1] };
					}
				}
				m += 12;
			}

			setPdata(k);
			console.log(pdata);
			setcurr(st1);
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
							<InputLabel id="demo-simple-select-label">Select a Threshold Value</InputLabel>
							<Select
								name="st1"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={threshold}
								label="Select a Threshold Value"
								onChange={handelpol}
							>
								<MenuItem>Select a Threshold Value</MenuItem>

								<MenuItem value="10">10</MenuItem>
								<MenuItem value="20">20</MenuItem>
								<MenuItem value="30">30</MenuItem>
								<MenuItem value="40">40</MenuItem>
								<MenuItem value="50">50</MenuItem>
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
						<Line dataKey={curr} stroke="red" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
