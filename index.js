const fs = require('fs');
const moment = require('moment');
const puppeteer = require('puppeteer');
const PushBullet = require('pushbullet');

const PUSHBULLET_ACCESS_TOKEN = process.env['PUSHBULLET_ACCESS_TOKEN'];

const pusher = new PushBullet(PUSHBULLET_ACCESS_TOKEN);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  const rows = await page.$$eval(
    ".athing .storylink",
    (anchors) => anchors.map(
      (anchor) => Object({
        href: anchor.href,
        title: anchor.textContent,
      })
    ),
  );

  await browser.close();

  let now = moment().format('YYYY-MM-DD HH:mm 기준');
  let title = `Hacker News\n${now}\n`;
  let body = '';

  for ([idx, row] of rows.entries()) {
    body += `${idx+1}. ${row.href}\n`;
  }

  pusher.note(process.env['PUSHBULLET_IDEN'], title, body, (err, res) => {
    console.log(res);
  });
})();