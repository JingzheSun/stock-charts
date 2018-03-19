import React from 'react';
import axios from 'axios';
import {Route, Switch, Link} from 'react-router-dom';

export default () => (
	<div className='container' style={styles.body}>
		<Switch>
			<Route path='/' exact component={Home}/>
			<Route path='/about' component={About}/>	
			<Route path='/:compName' component={Stocks}/>	
		</Switch>
	</div>
)

const About = () => (
	<h1>ABOUT</h1>
)

class Stocks extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: [[], []]
		}

		this.draw = this::this.draw;
	}

	componentDidMount () {
		let {match} = this.props;
		axios.post('/stocks', {name: match.params.compName})
		.then(res => {
			this.setState(prev => ({
				...prev,
				data: res.data
			}))
			this.draw()
		})
		.catch(err => console.log(err))
	}

	draw() {
		let {data} = this.state;
		var parseTime = d3.timeParse("%Y%m%d");

		data.forEach(c => {
		  	c.forEach(d => {
		    	d.date = parseTime(d.date);
		    	d.price = +d.price;
		  	});
		})

		var svg = d3.select("#chart"),
		    margin = {top: 20, right: 20, bottom: 30, left: 50},
		    width = svg.attr("width") - margin.left - margin.right,
		    height = svg.attr("height") - margin.top - margin.bottom,
		    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		
		var x = d3.scaleTime().domain([
	      	d3.min(data, c => d3.min(c, d => d.date)),
	      	d3.max(data, c => d3.max(c, d => d.date))
	    ]).range([0, width])
		var y = d3.scaleLinear().domain(d3.extent(data[0].map(d => d.price))).range([height, 0])

		var line = d3.line()
		    .curve(d3.curveCatmullRom.alpha(0.5))
		    .x(d => x(d.date))
		    .y(d => y(d.price));

		g.append("text")
		  .attr("transform", `translate(${width/3}, 15)`)
		  .attr("fill", "#000")
		  .text(`${this.props.match.params.compName} stock price`)
		  .style("font", "25px sans-serif");		    

		g.append("g")
		  .attr("class", "axis axis--x")
		  .attr('transform', `translate(0, ${height})`)
		  .call(d3.axisBottom(x))
		  .append("text")
		  .attr("transform", `translate(${width}, -5)`)
		  .attr("fill", "#000")
		  .text("Time");

		g.append("g")
		  .attr("class", "axis axis--y")
		  .call(d3.axisLeft(y))
		  .append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", "0.71em")
		  .attr("fill", "#000")
		  .text("Price USD");

		g.selectAll(".line")
		  .data(data)
		  .enter()
		  .append("path")
		  .attr("class", "line")
		  .attr("d", d => line(d))
		  .style("stroke", (d, i) => ['#FF9900', '#3369E8','#A3E908'][i])
		  .style('stroke-width', 2)
		  .style('fill', 'none');
	}

	render(){ 
		let {data} = this.state;
		let {compName} = this.props.match.params || '';
		return (
			<div style={{textAlign: 'center'}}>
				<h1 style={{marginLeft:'20px'}}>{compName}</h1>
				<hr />
				<svg id='chart' width="960" height="500" style={styles.svg}></svg>
			</div>
		)
	}
}

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			companies: ['AAPL', 'AXP', 'BA', 
				'CAT', 'CSCO', 'CVX', 'DIS', 
				'GE', 'GS', 'HD', 'IBM', 
				'INTC', 'JNJ', 'JPM', 'KO', 
				'MCD', 'MMM', 'MRK', 'MSFT', 
				'NKE', 'PFE', 'PG', 'TRV', 
				'UNH', 'UTX', 'V', 'VZ', 'WMT', 'XOM'
			]
		}
	}

	render(){ 
		let {companies} = this.state;
		return (
			<div>
				<h1 style={{marginLeft:'20px'}}>Stocks</h1>
				<hr />
				<div style={styles.box}>
					{
						companies.map((name, i) =>(
							<div key={i} className='compBox'>
								<Link to={`/${name}`} style={styles.compLink}>
									<h3 style={{textAlign: 'center'}}>{name}</h3>
								</Link>
							</div>
						))
					}
				</div>
			</div>
		)
	}
}

const styles = {};

styles.box = {
	display: 'flex',
	flexFlow: 'row',
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
	alignItems: 'center',
}

styles.body = {
	color: 'white',
	marginTop: '50px'
}

styles.compLink = {
	textDecoration: 'none',
	color: 'white'
}

styles.svg = {
	background: 'rgb(112,125,134,0.9)'
}
