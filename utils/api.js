import axios from 'axios';

function getRestDeInfo(params) {
  return axios.get(`/api/getRestDeInfo?year=${params.year}&date=${params.date}`)
}

export default {
  getRestDeInfo,
};
