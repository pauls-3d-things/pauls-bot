import { Message } from "discord.js";
import { Uptime } from "./uptime";
import { mkCommand, printUsage, printHelp } from "./commands_util";
import { Google } from "./google";
import { Ohm } from "./ohm";
import { Pwr } from "./pwr";

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
const commandsList = [Google, Uptime, Ohm, Pwr];
commandsList.forEach(cmd => commandsMap[cmd.cmd] = cmd);

export const Commands = {
    handle: (params: string[], msg: Message) => {
        if (msg.author.bot) return; // Ignore all bots

        const cmdStr = params[0].substr(1);
        const cmdParams = params.slice(1);

        console.log(msg.author.username, cmdStr, cmdParams);

        if (cmdStr === "help") {
            var response = "";

            if (cmdParams.length == 1 && commandsMap[params[1]]) {
                // print command usage
                response += printUsage(commandsMap[params[1]]);
            } else {
                // print list of commands
                commandsList.forEach(cmd => {
                    response += printHelp(cmd)
                });
            }
            msg.channel.send(response);
        } else if (commandsMap[cmdStr]) {
            // execute command
            commandsMap[cmdStr].handle(cmdParams, msg);
        } else {
            msg.channel.send("🤔I don't know `" + cmdStr + "`. Try `" + mkCommand("help") + "`.");
        }
    }
}