import config from './config';
import express from 'express';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

const app = express();

app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

app.set('view engine', 'ejs');

import serverRender from './serverRender';

app.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({initialMarkup, initialData}) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(console.error);
});

app.use(express.static('public'));
app.use('/api', apiRouter);

app.listen(config.port, config.host, () => {
  console.info(`Listenign on host: ${config.host} port: ${config.port}`);
});
