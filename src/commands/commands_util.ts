import { Command } from "./commands";


export const cc = "-";
export function mkCommand(theCommand: string) {
    return cc + theCommand;
};

export function printUsage(cmd: Command) {
    return "Usage:\n```bash\n" + cmd.usage + "\n```";
}