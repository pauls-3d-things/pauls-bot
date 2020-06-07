import { Message } from "discord.js";
import { Command } from "./commands";
import { mkCommand, printUsage } from "./commands_util";

export const getValue = (value: string, unit: string, params: string[]): number => {
    const i = params.findIndex(param => param.startsWith(value));
    const param = params[i];
    if (param) {
        var result = parseFloat(param.replace(/[^0-9.]/g, ""));
        const size = param.replace(/\d/g, "").split("=")[1];
        if (result && size) {
            switch (size) {
                case "k" + unit:
                    result = result * 1000;
                    break;
                case "m" + unit:
                    result = result / 1000;
                    break;
                case "u" + unit:
                    result = result / 1000_000;
                    break;
                default:
                // nop
            }
            return result;
        }
    }
    return 0;
}

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


export const Ohm: Command = {
    cmd: "ohm",
    usage: mkCommand("ohm") + " I=20mA V=3.7V",
    help: "Ohm's Law calulator",
    handle: (params: string[], msg: Message) => {
        const I = getValue("I", "A", params);
        const V = getValue("V", "V", params);
        const R = getValue("R", "", params);

        // V = R * I

        if (I > 0 && V > 0 && R > 0) {
            msg.channel.send("🤔Really?");
            return;
        }
        if (I > 0 && V > 0) {
            const r = V / I;
            msg.channel.send("=> " + readableValue(r, "Ω"));
        } else if (I > 0 && R > 0) {
            const v = I * R;
            msg.channel.send("=> " + readableValue(v, "V"));
        } else if (V > 0 && R > 0) {
            const i = V / R;
            msg.channel.send("=> " + readableValue(i, "A"));
        } else {
            msg.channel.send(printUsage(Ohm));
        }
    }
}