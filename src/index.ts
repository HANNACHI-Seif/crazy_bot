
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv'
import express from 'express'
import { Request, Response } from 'express'

const sleep = async (dur: number) => {
  return new Promise((res, rej) => {
    setTimeout(res, dur);
  })
}

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => ctx.reply('wee ki dayrin'));
bot.help((ctx) => ctx.reply('type crazy:)'));

bot.hears(/.*crazy.*/i, async (ctx) => {
  ctx.reply("crazy?...")
  await sleep(1000);
  ctx.reply("i was crazy once.")
  await sleep(1500);
  ctx.reply("they locked me in a room.")
  await sleep(1500);
  ctx.reply("a rubber room.")
  await sleep(1300);
  ctx.reply("a rubber room of rats.")
  await sleep(1500);
  ctx.reply("rats made me crazy.")
}
);

if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
  app.get('/', (req: Request, res: Response) => {
    res.send('Yoo')
  })
  bot.launch();
} else {
  // Use Long Polling for development
  bot.launch();
}

