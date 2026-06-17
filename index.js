require("dotenv").config();
const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/really-cool-bot-ping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
});


app.command("/really-cool-bot-catfact", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://catfact.ninja/fact");
        await respond({ text: `Cat Fact:\n${response.data.fact}` });
    } catch (err) {
        await respond({ text: "Failed to fetch a cat fact." });
    }
});
app.command("/really-cool-bot-joke", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        await respond({
        text:
    `${response.data.setup}

    ${response.data.punchline}`
        });
    } catch (err) {
        await respond({ text: "Failed to fetch a joke." });
    }
});
app.command("/help", async ({ ack, respond }) => {
    await ack();
    await respond({
        text: `Available commands:
        /really-cool-bot-ping - Check if the bot is online
        /really-cool-bot-catfact - Get a random cat fact
        /really-cool-bot-joke - Get a random joke
        /coinflip - Flip a coin
        /DiceRole - Role a dice
        `
    });
});
app.command("/coinflip", async ({ ack, respond }) => {
    await ack();
    const result = Math.random() < 0.5? "Heads":"Tails";
    await respond({
        text: ` coin flip result: ${result}`
    });
});
app.command("/DiceRole", async ({ ack, respond }) => {
    await ack();
    const result = Math.ceil(Math.random()*6);
    await respond({
        text: `Dice role result: ${result}`
    });
});
app.command("/really-cool-bot-quote", async ({ ack, respond }) => {
    await ack();

    const quotes = [
        "Small progress is still progress.",
        "Do not stop until you are proud.",
        "Mistakes are proof that you are trying.",
        "Focus on one step at a time.",
        "The best way to learn is to keep building."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    await respond({
        text: randomQuote
    });
});
app.command("/randomnumber", async ({ ack, respond }) => {
    await ack();
    const number = Math.floor(Math.random() * 100) + 1;
    await respond({
        text: `Your random number is: ${number}`
    });
});
(async () => {
    await app.start();
    console.log("bot is running!");
})();