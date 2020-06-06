import Discord from "discord.js";
import { readConfig } from "./config";

const config = readConfig();
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", msg => {
    console.log(msg);

    if (msg.content === "ping") {
        msg.reply("pong");
    }
});

console.log(config);

client.login(config.apitoken).catch(reason => {
    console.log("Failed", reason);

    process.exit();
});
