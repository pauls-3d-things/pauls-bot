import { Message } from "discord.js";
import { Uptime } from "./uptime";
import { mkCommand, printUsage } from "./commands_util";
import { Google } from "./google";
import { Ohm } from "./ohm";

export interface Command {
    cmd: string;
    help: string;
    usage: string;
    handle: (params: string[], msg: Message) => void;
}

interface CommandMap {
    [index: string]: Command
}

const commandsMap: CommandMap = {};
const commandsList = [Google, Uptime, Ohm];
commandsList.forEach(cmd => commandsMap[cmd.cmd] = cmd);

export const Commands = {
    handle: (params: string[], msg: Message) => {
        if (msg.author.bot) return; // Ignore all bots

        const cmd = params[0].substr(1);
        const cmdParams = params.slice(1);

        console.log(msg.author.username, cmd, cmdParams);

        if (cmd === "help") {
            var response = "";

            if (cmdParams.length == 1 && commandsMap[params[1]]) {
                // print command usage
                response += printUsage(commandsMap[params[1]]);
            } else {
                // print list of commands
                commandsList.forEach(cmd => {
                    response += "`" + mkCommand(cmd.cmd) + "` - *" + cmd.help + "*\n"
                });
            }
            msg.channel.send(response);
        } else if (commandsMap[cmd]) {
            // execute command
            commandsMap[cmd].handle(cmdParams, msg);
        } else {
            msg.channel.send("🤔I don't know `" + cmd + "`. Try `" + mkCommand("help") + "`.");
        }
    }
}