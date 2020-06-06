import Discord from "discord.js";
import { readConfig } from "./config";
import { messageEventHandler } from "./events/events";

const config = readConfig();
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", messageEventHandler);

client.login(config.apitoken).catch(reason => {
    console.log("Failed", reason);

    process.exit();
});
