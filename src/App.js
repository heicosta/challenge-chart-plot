import React, { Component } from 'react';
import CreateChart from './containers/CreateChart';
import ChartList from './containers/ChartList';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const stylesApp = {
  marginTop: 40
};

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={ stylesApp }>
          <div className="col-md-12">
            <CreateChart />
          </div>
        </div>
        <div className="row" style={ stylesApp }>
          <div className="col-md-12">
            <ChartList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
