import { createServer } from 'http';
import { getResponseHtml } from './lib/html.js';

const port = process.env.PORT || 3000;

createServer((req, res) => {
  const userAgent = req.headers['user-agent'];
  const html = getResponseHtml(userAgent);

  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(html);
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
