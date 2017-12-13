import { createServer } from 'http';
import app from './app';

const port = process.env.PORT || 3000;

createServer((req, res) => res.end(app(req, res))).listen(port, () =>
  process.stdout.write(`Running on :${port}\n`));

if (module.hot) {
  module.hot.accept('./app');
}
