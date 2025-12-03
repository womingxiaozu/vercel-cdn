import { getResponseHtml } from '../lib/html.js';

export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'];
  const html = getResponseHtml(userAgent);

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  return res.status(200).send(html);
}
