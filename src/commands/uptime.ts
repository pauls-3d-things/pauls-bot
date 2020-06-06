import { Message } from "discord.js";
import { Command } from "./commands";
import { mkCommand } from "./commands_util";

export const Uptime: Command = {
    cmd: "uptime",
    example: mkCommand("uptime"),
    help: "shows the bot's uptime",
    handle: (params: string[], msg: Message) => {
        const seconds = process.uptime();
        const s = seconds % 60
        const m = (seconds - s) % (60 * 60);
        const h = (seconds - m - s) % (60 * 60 * 24);
        const d = (seconds - h - m - s)

        const sstr = Math.floor(s);
        const mstr = Math.floor(m / 60);
        const hstr = Math.floor(h / 60 / 60);
        const dstr = Math.floor(d / 60 / 60 / 24);

        msg.channel.send(`⏱${dstr}d ${hstr}h ${mstr}m ${sstr}s`);
    }
}