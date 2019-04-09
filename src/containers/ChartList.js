import React from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import { deleteChart } from '../actions';

function ChartList({ charts, onDelete }) {
  if(!charts.length) {
    return (
      <div>
        No Charts
      </div>
    )
  }
  return (
    <div>
      {charts.map(chart => {
        return (
          <Chart chart={ chart } onDelete={ onDelete } key={ chart._id } />
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    charts: state.charts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteChart(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartList);