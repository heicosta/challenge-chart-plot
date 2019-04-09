import { combineReducers } from 'redux';
import charts from './chartReducer';

export default combineReducers({
    charts: charts
});