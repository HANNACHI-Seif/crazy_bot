
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv'

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

bot.launch();
