import { Message } from "discord.js";
import { Commands } from "../commands/commands";
import { cc } from "../commands/commands_util";

export const messageEventHandler = (msg: Message) => {
    const parts = msg.content.split(" ");
    
    if (parts.length > 0) {
        if (parts[0].startsWith(cc)) {
            Commands.handle(parts, msg);
        }
    }
}