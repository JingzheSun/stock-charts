import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Header from './Header.js';
import Body from './Body.js';

render((
	<BrowserRouter>
		<div>
			<Header />
			<Body />
		</div>
	</BrowserRouter>
), document.getElementById('root'));

