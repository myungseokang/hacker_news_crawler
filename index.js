const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  const rows = await page.$$eval(
    ".athing .storylink",
    (anchors) => anchors.map((anchor) => `- [${anchor.textContent}](${anchor.href})`),
  );
  
  let data = '# Hacker News\n\n';
  data += rows.join('\n');
  fs.writeFileSync('./generated/crawl.md', data, 'utf8');

  await browser.close();
})();