import { ADD_CHART, DELETE_CHART, FETCH_CHART } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/charts';

export const createChart = ({ title, body }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, {title, body})
      .then(response => {
        dispatch(createChartSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createChartSuccess =  (data) => {
  return {
    type: ADD_CHART,
    payload: {
      _id: data._id,
      title: data.title,
      body: data.body
    }
  }
};

export const deleteChartSuccess = id => {
  return {
    type: DELETE_CHART,
    payload: {
      id
    }
  }
};

export const deleteChart = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteChartSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchCharts = (charts) => {
  return {
    type: FETCH_CHART,
    charts
  }
};

export const fetchAllCharts = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchCharts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};