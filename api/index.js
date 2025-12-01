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

  // 其它情况：正常跳转/下单页面
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  return res.status(200).send(getRedirectPage());
}

/**
 * 微信 / QQ 内置浏览器提示页面（亮色 + 文案：复制链接到浏览器打开）
 */
function getInAppWarningPage() {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>系统提示</title>
      <style>
        :root {
          --bg: #f3f4f6;
          --card-bg: rgba(255, 255, 255, 0.92);
          --card-border: rgba(15, 23, 42, 0.08);
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --primary-gradient: linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%);
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: "PingFang SC", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          min-height: 100vh;
          background: radial-gradient(circle at top, #e5edff 0%, #f9fafb 60%, #e5e7eb 100%);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          overflow: hidden;
          position: relative;
        }

        .noise-layer {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='noStitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          pointer-events: none;
          z-index: -1;
        }

        .card {
          width: 100%;
          max-width: 360px;
          background: var(--card-bg);
          border-radius: 26px;
          padding: 24px 22px 20px;
          border: 1px solid var(--card-border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.5);
          text-align: center;
          position: relative;
          animation: cardIn 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 18px;
          background: var(--primary-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px auto 14px;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.45);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 11px;
          color: var(--text-secondary);
          border: 1px solid rgba(148, 163, 184, 0.4);
          background: rgba(249, 250, 251, 0.9);
          margin-bottom: 8px;
        }

        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }

        .desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .desc .highlight {
          color: #111827;
          font-weight: 600;
        }

        .steps {
          font-size: 13px;
          color: var(--text-secondary);
          text-align: left;
          margin: 0 auto 16px;
          max-width: 280px;
          line-height: 1.7;
        }

        .steps li {
          margin-bottom: 4px;
        }

        .btn-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btn-main {
          border-radius: 999px;
          padding: 10px 14px;
          border: none;
          outline: none;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          background-image: var(--primary-gradient);
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.45);
        }

        .btn-secondary {
          border-radius: 999px;
          padding: 9px 12px;
          font-size: 13px;
          color: var(--text-secondary);
          background: #f9fafb;
          border: 1px solid rgba(209, 213, 219, 0.9);
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      </style>
    </head>
    <body>
      <div class="noise-layer"></div>

      <div class="card">
        <div class="icon-wrap">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"></circle>
            <polygon points="15.5 8.5 13.6 13.6 8.5 15.5 10.4 10.4 15.5 8.5"></polygon>
          </svg>
        </div>
        <div class="pill">系统提示</div>
        <div class="title">当前环境不支持</div>
        <div class="desc">
          检测到您正在使用 <span class="highlight">微信或 QQ 内置浏览器</span> 访问。<br>
          为了保障支付安全和稳定，本页面暂不支持在当前环境中打开。
        </div>
        <ul class="steps">
          <li>1. 复制当前页面链接；</li>
          <li>2. 打开手机自带浏览器（如 Safari / 系统浏览器）；</li>
          <li>3. 在地址栏粘贴链接并访问。</li>
        </ul>
        <div class="btn-row">
          <button class="btn-main">请复制链接到浏览器打开</button>
          <div class="btn-secondary">如仍有问题，可在浏览器中联系在线客服</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 正常跳转页面（亮色 + 延迟测试 + 推荐标记 + 无底部横线）
 */
function getRedirectPage() {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>疯果VPP</title>
      <!-- DevTools protection removed for development -->
      <script>
        // Development mode - DevTools protection disabled
        console.log('Payment center page loaded');
      </script>
      <style>
        :root {
          --bg: #f3f4f6;
          --card-bg: rgba(255, 255, 255, 0.96);
          --card-border: rgba(15, 23, 42, 0.08);
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --primary-gradient: linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%);
          --accent-soft: #e5edff;
        }

        * {
          box-sizing: border-box;
        }

        body { 
          font-family: "PingFang SC", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0; 
          min-height: 100vh;
          background: radial-gradient(circle at top, #e5edff 0%, #f9fafb 60%, #e5e7eb 100%);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 18px 26px;
          overflow-x: hidden;
          position: relative;
        }

        .noise-layer {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='noStitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          pointer-events: none;
          z-index: -1;
        }

        .container {
          width: 100%;
          max-width: 420px;
          z-index: 1;
        }

        /* 头部 */
        header {
          margin-bottom: 24px;
          text-align: center;
          animation: fadeInDown 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .title-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 11px;
          color: var(--text-secondary);
          border: 1px solid rgba(148, 163, 184, 0.4);
          background: rgba(249, 250, 251, 0.95);
          margin-bottom: 8px;
        }

        h1 {
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          background: linear-gradient(to bottom, #111827 40%, #4b5563 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.3px;
        }
        
        .subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 8px;
          font-weight: 400;
        }

        /* 通道卡片组 */
        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s backwards;
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: var(--card-bg);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          text-decoration: none;
          color: var(--text-primary);
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.45), transparent);
          opacity: 0.6;
        }

        .nav-item:active {
          transform: scale(0.98);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.14);
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-icon {
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: var(--accent-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .nav-text-main {
          font-size: 15px;
          font-weight: 500;
        }

        .nav-text-sub {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .latency-label {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 999px;
          background: #eef2ff;
          color: #4f46e5;
        }

        .nav-arrow {
          opacity: 0.45;
          font-size: 13px;
          color: #9ca3af;
        }

        .tag-recommend {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 999px;
          background: #f97316;
          color: #fff;
          box-shadow: 0 4px 10px rgba(248, 113, 113, 0.4);
          display: none;
        }

        .nav-item.recommended {
          border-color: rgba(248, 113, 22, 0.4);
          box-shadow: 0 12px 26px rgba(248, 113, 22, 0.28);
        }

        /* 底部两个功能按钮：更小、更居中 */
        .footer-links {
          margin-top: 22px;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.12s backwards;
        }

        .footer-btn {
          padding: 12px 24px;
          font-size: 16px;
          color: var(--text-secondary);
          background: #f9fafb;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid rgba(209, 213, 219, 0.9);
          transition: all 0.2s;
        }

        .footer-btn:hover {
          background: #e5edff;
          color: #111827;
          border-color: #93c5fd;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 360px) {
          body {
            padding-top: 30px;
          }
          .nav-item {
            padding-inline: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="noise-layer"></div>

      <div class="container">
        <header>
          <div class="title-pill">疯果VPP · 安全导航</div>
          <h1>选择下单通道</h1>
          <div class="subtitle">已为你自动测试当前网络下各通道延迟，优先使用推荐线路</div>
        </header>

        <div class="nav-group">
          <a href="https://ap.apnfenguo.top/" class="nav-item" target="_blank" data-line-id="line1">
            <span class="tag-recommend" data-tag-for="line1">推荐</span>
            <div class="nav-content">
              <div class="nav-icon">⚡️</div>
              <div>
                <div class="nav-text-main">极速通道 ①</div>
                <div class="nav-text-sub">优先推荐 · 较高成功率</div>
              </div>
            </div>
            <div class="nav-right">
              <span class="latency-label" data-latency-id="line1">测试中…</span>
              <div class="nav-arrow">›</div>
            </div>
          </a>

          <a href="https://xx.fenguobom.top/" class="nav-item" target="_blank" data-line-id="line2">
            <span class="tag-recommend" data-tag-for="line2">推荐</span>
            <div class="nav-content">
              <div class="nav-icon">💎</div>
              <div>
                <div class="nav-text-main">备用通道 ②</div>
                <div class="nav-text-sub">线路优化 · 稳定性更佳</div>
              </div>
            </div>
            <div class="nav-right">
              <span class="latency-label" data-latency-id="line2">测试中…</span>
              <div class="nav-arrow">›</div>
            </div>
          </a>

          <a href="https://www.payvpp.top/" class="nav-item" target="_blank" data-line-id="line3">
            <span class="tag-recommend" data-tag-for="line3">推荐</span>
            <div class="nav-content">
              <div class="nav-icon">🛡️</div>
              <div>
                <div class="nav-text-main">备用通道 ③</div>
                <div class="nav-text-sub">前两条无法使用时再尝试</div>
              </div>
            </div>
            <div class="nav-right">
              <span class="latency-label" data-latency-id="line3">测试中…</span>
              <div class="nav-arrow">›</div>
            </div>
          </a>
        </div>

        <div class="footer-links">
          <a href="https://tawk.to/chat/66addd061601a2195ba04b79/1i4bieonn" class="footer-btn" target="_blank">在线客服</a>
          <a href="https://xx.vppn.top/course.html" class="footer-btn" target="_blank">使用教程</a>
        </div>
      </div>

      <script>
        // 简单本地延迟测试 + 推荐线路标记
        (function () {
          const lines = [
            { id: 'line1', url: 'https://ap.apnfenguo.top/' },
            { id: 'line2', url: 'https://xx.fenguobom.top/' },
            { id: 'line3', url: 'https://www.payvpp.top/' },
          ];

          function testLatency(line) {
            const start = performance.now();
            return fetch(line.url, { method: 'GET', mode: 'no-cors', cache: 'no-store' })
              .catch(() => null)
              .then(() => {
                const end = performance.now();
                const latency = Math.round(end - start);
                if (!isFinite(latency) || latency <= 0) {
                  return null;
                }
                return latency;
              });
          }

          async function runTests() {
            const results = {};
            for (const line of lines) {
              const el = document.querySelector('[data-latency-id="' + line.id + '"]');
              if (el) {
                el.textContent = '测试中…';
              }
            }

            await Promise.all(lines.map(async (line) => {
              const latency = await testLatency(line);
              results[line.id] = latency;

              const labelEl = document.querySelector('[data-latency-id="' + line.id + '"]');
              if (!labelEl) return;

              if (latency === null) {
                labelEl.textContent = '不可用';
                labelEl.style.background = '#fee2e2';
                labelEl.style.color = '#b91c1c';
              } else {
                labelEl.textContent = latency + ' ms';
              }
            }));

            // 找出延迟最小的一条通道并标记“推荐”
            const validLatencies = Object.entries(results)
              .filter(([_, v]) => v !== null);

            if (validLatencies.length === 0) {
              return;
            }

            validLatencies.sort((a, b) => a[1] - b[1]);
            const bestId = validLatencies[0][0];

            const bestCard = document.querySelector('.nav-item[data-line-id="' + bestId + '"]');
            const tag = document.querySelector('.tag-recommend[data-tag-for="' + bestId + '"]');
            if (bestCard && tag) {
              bestCard.classList.add('recommended');
              tag.style.display = 'inline-block';
            }
          }

          window.addEventListener('load', () => {
            setTimeout(runTests, 300);
          });
        })();
      </script>
    </body>
    </html>
  `;
}
