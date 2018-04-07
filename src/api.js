import axios from 'axios';

export const fetchContest = (contestId) => {
  return axios.get(`/api/contests/${contestId}`)
              .then((res) => {
                return res.data;
              })
              .catch(console.error);
};

export const fetchContestList = () => {
  return axios.get('/api/contests')
              .then((res) => {
                return res.data.contests;
              })
              .catch(console.error);
};

export const fetchNames = (nameIds) => {
  return axios.get(`/api/names/${nameIds.join(',')}`)
              .then((res) => {
                return res.data.names;
              })
              .catch(console.error);
};

export const addNewName = (name, contestId) => {
  return axios.post('/api/names', {name, contestId})
              .then((res) => {
                return res.data;
              })
              .catch((error) => {
                return error;
              });
};
