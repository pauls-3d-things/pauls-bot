import { Command } from "./commands";


export const cc = "-";
export function mkCommand(theCommand: string) {
    return cc + theCommand;
};

export function printHelp(cmd: Command) {
    return "`" + mkCommand(cmd.cmd) + "` - *" + cmd.help + "*\n"
}

export function printUsage(cmd: Command) {
    return printHelp(cmd) + "Usage:\n```bash\n" + cmd.usage + "\n```";
}
