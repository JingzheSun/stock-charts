import React from 'react';
import axios from 'axios';
import {HashRouter, BrowserRouter, Route, Switch, Link} from 'react-router-dom';


export default class Header extends React.Component{

	render(){
		return (
			<header id='header' style={styles.box}>
				<div>
					<Link style={styles.link} to="/">HOME</Link>
				</div>
				<div>
					<Link style={styles.link} to="/about">ABOUT</Link>
				</div>			
			</header>
		)
	}
};


const styles = {};
styles.box = {
	background: 'rgba(1,1,1,0.4)',
	height: '50px',
	position: 'fixed',
	top: 0,
	right: 0,
  	left: 0,
  	zIndex: 1030,
	display: 'flex',
	flexFlow: 'row',
	flexWrap: 'nowrap',
	justifyContent: 'space-around',
	alignItems: 'center'
}

styles.link = {
	textDecoration: 'none',
	color: 'white',
	fontSize: '130%',
	fontFamily: 'Hind Siliguri, sans-serif'
}