import { connect } from 'react-redux';
import { createChart } from '../actions';
import NewChart from '../components/NewChart';

const mapDispatchToProps = dispatch => {
  return {
    onAddChart: chart => {
      dispatch(createChart(chart));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewChart);