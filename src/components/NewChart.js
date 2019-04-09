import React from 'react';

import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

class NewChart extends React.Component {
  state = {
    title: '',
    body: ''
  };

  sampleObject = [
      {type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']},
      {type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201},
      {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.3, max_response_time: 0.9},
      {type: 'data', timestamp: 1519780251000, os: 'mac', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.5},
      {type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'safari', min_response_time: 0.2, max_response_time: 1.30},
      {type: 'stop', timestamp: 1519780251293}
  ];

  handleInputChange = e => {
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

  render() {
    return (
      <div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
              <input
              type="text"
              placeholder="Chart Title"
              className="form-control"
              name="title"
              onChange={ this.handleInputChange }
              value={ this.state.title }
            />
          </div>
          <div className="form-group">
            <JSONInput
              id          = 'chart_input_data'
              placeholder = { this.sampleObject }
              locale      = { locale }
              width       = '100%'
              height      = '200px'
              value       = { this.state.body }
            />
          </div>
          <div className="form-group">
            <pre>CHART HEREEEEEEEEEEEEEEE!</pre>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Chart</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewChart;