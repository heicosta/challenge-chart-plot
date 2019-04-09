import { ADD_CHART, DELETE_CHART, FETCH_CHART } from '../actions/types';

export default function chartReducer(state = [], action) {
  switch (action.type) {
    case ADD_CHART:
      return [...state, action.payload];
    case DELETE_CHART:
      return state.filter(chart => chart._id !== action.payload.id);
      case FETCH_CHART:
      return action.charts;
    default:
      return state;
  }
}