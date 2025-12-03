import { getResponseHtml } from '../../lib/html.js';

export const handler = async (event, context) => {
  const userAgent = event.headers['user-agent'];
  const html = getResponseHtml(userAgent);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
    body: html,
  };
};
