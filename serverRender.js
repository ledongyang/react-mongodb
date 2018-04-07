import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import axios from 'axios';
import config from './config';

const getApiUrl = (contestId) => {
  if (contestId) {
    return `${config.serverUrl}/api/contests/${contestId}`;
  }
  return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId: contestId,
      contests: {
        [apiData._id]: apiData
      }
    };
  }
  return apiData;
};

const serverRender = (contestId) => {
  return axios.get(getApiUrl(contestId))
    .then((res) => {
      const initialData = getInitialData(contestId, res.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData}/>
        ),
        initialData
      };
    })
    .catch(console.error);
};

export default serverRender;
