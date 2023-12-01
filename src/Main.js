import React from 'react';
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Typography,
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia
} from '@mui/material';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import { Data } from './Utils/Data';
import CountUp from 'react-countup';
import image from './Components/usa.webp';
import Footer from './Components/Footer';

export default function Main() {
	return (
		<div>
			<Navbar />

			<span className="head">
				<p>AQIUS</p>
			</span>

			<div>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<div className="usp">
							<img src={image} />
						</div>
					</Grid>
					<Grid item xs={5}>
						<div className="usp">
							<h4>
								Researching the Air Quality Index (AQI) in the USA is crucial for safeguarding public
								health, informing environmental policies, and addressing the interconnected challenges
								of air pollution and climate change
							</h4>
						</div>
					</Grid>
				</Grid>
			</div>

			<div className="ct">
				Total Number of Tuples : <CountUp end={6803460} />
			</div>
			<div className="cardcontain">
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<a href="/q1">
							<Card sx={{ maxWidth: 300 }} className="qcard">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
										sx={{ marginLeft: '20%', fontWeight: '800' }}
									>
										Query 1
									</Typography>
								</CardContent>
								<CardActions />
							</Card>
						</a>
					</Grid>
					<Grid item xs={2}>
						<a href="/q2">
							<Card sx={{ maxWidth: 200 }} className="qcard">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
										sx={{ marginLeft: '20%', fontWeight: '800' }}
									>
										Query 2
									</Typography>
								</CardContent>
								<CardActions />
							</Card>
						</a>
					</Grid>

					<Grid item xs={2}>
						<a href="/q3">
							<Card sx={{ maxWidth: 200 }} className="qcard">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
										sx={{ marginLeft: '20%', fontWeight: '800' }}
									>
										Query 3
									</Typography>
								</CardContent>
								<CardActions />
							</Card>
						</a>
					</Grid>

					<Grid item xs={2}>
						<a href="/q4">
							<Card sx={{ maxWidth: 200 }} className="qcard">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
										sx={{ marginLeft: '20%', fontWeight: '800' }}
									>
										Query 4
									</Typography>
								</CardContent>
								<CardActions />
							</Card>
						</a>
					</Grid>

					<Grid item xs={2}>
						<a href="/q5">
							<Card sx={{ maxWidth: 200 }} className="qcard">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
										sx={{ marginLeft: '20%', fontWeight: '800' }}
									>
										Query 5
									</Typography>
								</CardContent>
								<CardActions />
							</Card>
						</a>
					</Grid>
				</Grid>

				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}
