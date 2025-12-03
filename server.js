import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getResponseHtml } from './lib/html.js';

const port = process.env.PORT || 3000;

createServer(async (req, res) => {
  // 获取 URL 路径（去掉查询参数）
  const url = new URL(req.url, `http://${req.headers.host}`).pathname;

  // 1. 静态文件路由：访问 /course.html
  if (url === '/course.html') {
    try {
      const filePath = join(process.cwd(), 'public', 'course.html');
      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(content);
      return;
    } catch (err) {
      console.error('File not found:', err);
    }
  }

  // 2. 默认逻辑：首页跳转判断
  const userAgent = req.headers['user-agent'];
  const html = getResponseHtml(userAgent);

  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(html);

}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
