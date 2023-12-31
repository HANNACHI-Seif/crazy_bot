import dotenv from 'dotenv'
import { Bot, InlineKeyboard, webhookCallback } from "grammy";
import express from "express";

const sleep = async (dur: number) => {
  return new Promise((res, rej) => {
    setTimeout(res, dur);
  })
}

dotenv.config()

const bot = new Bot(process.env.BOT_TOKEN as string);

bot.command("start", (ctx) => ctx.reply("Weeee ki dayrin"));
bot.command("help", (ctx) => ctx.reply("say my name..."));

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

// Start the server
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}

