
import * as fs from "fs";
import * as path from "path";

export interface BotConfig {
    apitoken: string;
}

export const readConfig = () => {
    const configPath = path.resolve("config.json");
    if (!fs.existsSync(configPath)){
        console.log("Error: config missing.");
        console.log("File:", configPath);
        process.exit();
    } else {
        console.log("Loaded ", configPath);
    }
    return JSON.parse(fs.readFileSync(configPath, { encoding: "utf-8" })) as BotConfig;
}