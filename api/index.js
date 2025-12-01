export default async function handler(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // 判断是否为微信或 QQ 内置浏览器
  const isWeChat = userAgent.includes('micromessenger');
  const isQQ =
    userAgent.includes('qq/') ||
    userAgent.includes('mqqbrowser') ||
    userAgent.includes('qqbrowser');

  const isInAppBrowser = isWeChat || isQQ;

  // 如果是微信或 QQ 内置浏览器，返回复制链接提示页面
  if (isInAppBrowser) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    return res.status(200).send(getInAppWarningPage());
  }

  // 否则返回正常跳转页面
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  return res.status(200).send(getRedirectPage());
}

/**
 * 微信 / QQ 内置浏览器提示页面
 */
function getInAppWarningPage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>系统提示</title>
<style>
/* 样式部分保持不变 */
:root {
  --bg: #f3f4f6;
  --card-bg: rgba(255, 255, 255, 0.92);
  --card-border: rgba(15, 23, 42, 0.08);
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --primary-gradient: linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%);
}
* { box-sizing: border-box; }
body {
  font-family: "PingFang SC", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at top, #e5edff 0%, #f9fafb 60%, #e5e7eb 100%);
  display: flex; align-items: center; justify-content: center; padding: 32px 16px;
}
.card {
  max-width: 360px; background: var(--card-bg); border-radius: 26px;
  padding: 24px 22px 20px; border: 1px solid var(--card-border);
  text-align: center; box-shadow: 0 18px 45px rgba(15,23,42,0.12);
}
.title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
.desc { font-size: 14px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px; }
.btn-main {
  border-radius: 999px; padding: 10px 14px; border: none; font-size: 15px;
  color: #fff; background-image: var(--primary-gradient); cursor: pointer;
}
</style>
</head>
<body>
<div class="card">
  <div class="title">当前环境不支持</div>
  <div class="desc">检测到您正在使用 <b>微信或 QQ 内置浏览器</b> 访问。<br>请复制链接到浏览器打开。</div>
  <button class="btn-main">复制链接到浏览器打开</button>
</div>
</body>
</html>`;
}

/**
 * 正常跳转页面
 */
function getRedirectPage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>疯果VPP</title>
<style>
:root {
  --bg: #f3f4f6;
  --card-bg: rgba(255, 255, 255, 0.96);
  --card-border: rgba(15, 23, 42, 0.08);
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --primary-gradient: linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%);
}
* { box-sizing: border-box; }
body {
  font-family: "PingFang SC", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at top, #e5edff 0%, #f9fafb 60%, #e5e7eb 100%);
  display: flex; flex-direction: column; align-items: center; padding: 40px 18px;
}
.container { max-width: 420px; width: 100%; }
.nav-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 18px; background: var(--card-bg);
  border: 1px solid var(--card-border); border-radius: 20px;
  margin-bottom: 12px; text-decoration: none; color: var(--text-primary);
}
.nav-icon { font-size: 20px; margin-right: 12px; }
.nav-text-main { font-size: 15px; font-weight: 500; }
.latency-label {
  font-size: 11px; padding: 2px 6px; border-radius: 999px;
  background: #eef2ff; color: #4f46e5;
}
.footer-btn {
  padding: 12px 24px; border-radius: 999px; border: 1px solid rgba(209,213,219,0.9);
  color: var(--text-secondary); text-decoration: none; margin: 6px;
}
.footer-btn:hover { background: #e5edff; color: #111827; }
</style>
</head>
<body>
<div class="container">
  <h1 style="text-align:center;font-size:26px;">疯果VPP · 安全导航</h1>
  <p style="text-align:center;color:#6b7280;">选择下单通道（自动测试延迟）</p>
  <a href="https://ap.apnfenguo.top/" class="nav-item" target="_blank">
    <div><span class="nav-icon">⚡️</span><span class="nav-text-main">极速通道 ①</span></div>
    <span class="latency-label">测试中…</span>
  </a>
  <a href="https://xx.fenguobom.top/" class="nav-item" target="_blank">
    <div><span class="nav-icon">💎</span><span class="nav-text-main">备用通道 ②</span></div>
    <span class="latency-label">测试中…</span>
  </a>
  <a href="https://www.payvpp.top/" class="nav-item" target="_blank">
    <div><span class="nav-icon">🛡️</span><span class="nav-text-main">备用通道 ③</span></div>
    <span class="latency-label">测试中…</span>
  </a>
  <div style="text-align:center;margin-top:20px;">
    <a href="https://tawk.to/chat/66addd061601a2195ba04b79/1i4bieonn" class="footer-btn" target="_blank">在线客服</a>
    <a href="https://xx.vppn.top/course.html" class="footer-btn" target="_blank">使用教程</a>
  </div>
</div>
<script>
(function () {
  const lines = [
    { id: 1, url: 'https://ap.apnfenguo.top/' },
    { id: 2, url: 'https://xx.fenguobom.top/' },
    { id: 3, url: 'https://www.payvpp.top/' }
  ];
  async function test(line) {
    const start = performance.now();
    try { await fetch(line.url, { method: 'GET', mode: 'no-cors', cache: 'no-store' }); }
    catch {}
    const latency = Math.round(performance.now() - start);
    const label = document.querySelectorAll('.latency-label')[line.id - 1];
    label.textContent = latency + ' ms';
  }
  window.addEventListener('load', () => {
    setTimeout(() => lines.forEach(test), 300);
  });
})();
</script>
</body>
</html>`;
}
