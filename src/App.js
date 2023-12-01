import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Query3 from './Queries/Query3';
import Query4 from './Queries/Query4';
import Query5 from './Queries/Query5';

import Query2 from './Queries/Query2';
import Query1 from './Queries/Query1';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route exact path="/q1" element={<Query1 />} />
				<Route exact path="/q2" element={<Query2 />} />
				<Route exact path="/q3" element={<Query3 />} />
				<Route exact path="/q4" element={<Query4 />} />
				<Route exact path="/q5" element={<Query5 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
