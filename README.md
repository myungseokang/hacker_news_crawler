# Hacker News Crwaler

> Using Node.js, Puppeteer

## Install

```
$ npm install
```

You need 2 environment variables named `PUSHBULLET_ACCESS_TOKEN`, `PUSHBULLET_IDEN`.

Then, I use `autoenv`.
my `.env` file below.
```
export PUSHBULLET_ACCESS_TOKEN="<YOUR_PUSHBULLET_ACCESS_TOKEN>"
export PUSHBULLET_IDEN="<PUSHBULLET_IDEN>"
```

## Run

```
$ node index.js
```

## TO-DO
- [ ] Run periodically
- [x] Push Notification using Push Bullet
- [ ] Change Push Notification to come Slack with markdown
