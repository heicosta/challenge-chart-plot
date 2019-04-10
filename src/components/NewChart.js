import React from 'react';

// JSONInput plugin
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// @uber/React-vis plugin
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';

class NewChart extends React.Component {
	state = {
		title: '',
		body: '',
		crosshairValues: []
	};

	// sample data for simple demonstrate the business correct input pattern
	sampleObject = [

		/* data read from challange_frontend.png with https://www.newocr.com/
    {type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser' ]},
    {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3},
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2},
    {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2},
    {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0},
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9},
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0},
    {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1},
    {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4},
    {type: 'stop', timestamp: 1519862460000}
       */

		[{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}],
		[{x: 1, y: 20}, {x: 2, y: 5}, {x: 3, y: 15}]
	];

	handleInputChange = e => {
		const jsonObj = e.jsonObj;
		for (let prop in jsonObj) {
			console.log(prop + " -> " + jsonObj[prop]);
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
		this.setState({crosshairValues: DATA.map(d => d[index])});
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
							onChange={this.handleInputChange}
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
						/>
					</div>
					<div className="form-group">
						<XYPlot onMouseLeave={this._onMouseLeave} width={300} height={300}>
							<VerticalGridLines />
							<HorizontalGridLines />
							<XAxis />
							<YAxis />
							<LineSeries onNearestX={this._onNearestX} data={this.sampleObject[0]} />
							<LineSeries data={this.sampleObject[1]} />
							<Crosshair
								values={this.state.crosshairValues}
								className={'test-class-name'}
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
