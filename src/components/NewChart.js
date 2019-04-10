import React from 'react';

// JSONInput plugin
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// @uber/React-vis plugin
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries } from 'react-vis';

class NewChart extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: [
				[{x: 0.1, y: 1.3}, {x: 0.2, y: 0.9}], // { linux-chrome [min_response_time, max_response_time] }
				[{x: 0.2, y: 1.2}, {x: 0.1, y: 1.0}], // { mac-chrome [min_response_time, max_response_time] }
				[{x: 0.1, y: 1.0}, {x: 0.3, y: 1.4}], // { linux-firefox [min_response_time, max_response_time] }
				[{x: 0.3, y: 1.2}, {x: 0.2, y: 1.1}], // { mac-firefox [min_response_time, max_response_time] }
			],
			crosshairValues: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	// sample data for simple demonstrate the business correct input pattern
	sampleObject = [

		// data read from challange_frontend.png with https://www.newocr.com/
    {type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser' ]},
    {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3},
		{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9},
		{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2},
		{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0},
		{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0},
		{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4},
		{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2},
		{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1},
    {type: 'stop', timestamp: 1519862460000}
	];

	handleInputChange = e => {
		const events = e.jsObject;
		let eventsMap = new Map();
		for (const event of events) {
			switch (event.type) {
				case 'start':
					// todo
				case 'span':
					// todo
				case 'data':
				// todo
				case 'stop':
				// todo
			}
		}

		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.title.trim() && this.state.body.trim()) {
			this.props.onAddChart(this.state);
			this.handleReset();
		}
	};

	handleReset = () => {
		this.setState({
			title: '',
			body: ''
		});
	};

	/**
	 * Event handler for onMouseLeave.
	 * @private
	 */
	_onMouseLeave = () => {
		this.setState({crosshairValues: []});
	};

	/**
	 * Event handler for onNearestX.
	 * @param {Object} value Selected value.
	 * @param {index} index Index of the value in the data array.
	 * @private
	 */
	_onNearestX = (value, {index}) => {
		this.setState({crosshairValues: this.sampleObject.map(d => d[index])});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Chart Title"
							className="form-control"
							name="title"
							value={this.state.title}
						/>
					</div>
					<div className="form-group">
						<JSONInput
							id='chart_input_data'
							placeholder={this.sampleObject}
							locale={locale}
							width='100%'
							height='200px'
							value={this.state.body}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<XYPlot width={300} height={300}>
							<VerticalGridLines />
							<HorizontalGridLines />
							<XAxis />
							<YAxis />
							<LineMarkSeries
								className="linemark-series-example"
								style={{
									strokeWidth: '3px'
								}}
								lineStyle={{stroke: 'red'}}
								markStyle={{stroke: 'blue'}}
								data={this.state.body[0]}
							/>
							<LineMarkSeries
								className="linemark-series-example-2"
								curve={'curveMonotoneX'}
								data={this.state.body[1]}
							/>
							<LineMarkSeries
								className="linemark-series-example-3"
								curve={'curveMonotoneX'}
								data={this.state.body[2]}
							/>
							<LineMarkSeries
								className="linemark-series-example-4"
								curve={'curveMonotoneX'}
								data={this.state.body[3]}
							/>
						</XYPlot>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">Add Chart</button>
						<button type="button" className="btn btn-warning" onClick={this.handleReset}>
							Reset
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default NewChart;
