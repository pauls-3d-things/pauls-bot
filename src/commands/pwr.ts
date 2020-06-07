import { Message } from "discord.js";
import { Command } from "./commands";
import { mkCommand, printUsage } from "./commands_util";
import { getValue } from "./ohm";

export const readableValue = (value: number, unit: string): string => {
    if (value >= 1000) {
        return (value / 1000).toFixed(2) + "k" + unit;
    } else if (value >= 1) {
        return "" + value.toFixed(0) + unit;
    } else if (value >= 0.001) {
        return "" + (value * 1000).toFixed(0) + "m" + unit;
    } else {
        return "" + (value * 1000_000).toFixed(0) + "µ" + unit
    }
}


export const Pwr: Command = {
    cmd: "pwr",
    usage: mkCommand("pwr") + " I=20mA V=3.7V",
    help: "power calulator",
    handle: (params: string[], msg: Message) => {
        const I = getValue("I", "A", params);
        const V = getValue("V", "V", params);
        const W = getValue("W", "W", params);
        
        // W = V * I

        if (I > 0 && V > 0 && W > 0) {
            msg.channel.send("🤔Really?");
            return;
        }
        if (I > 0 && V > 0) {
            const w = V * I;
            msg.channel.send("=> " + readableValue(w, "W"));
        } else if (I > 0 && W > 0) {
            const v = W / I;
            msg.channel.send("=> " + readableValue(v, "V"));
        } else if (V > 0 && W > 0) {
            const i = W / V;
            msg.channel.send("=> " + readableValue(i, "A"));
        } else {
            msg.channel.send(printUsage(Pwr));
        }
    }
}