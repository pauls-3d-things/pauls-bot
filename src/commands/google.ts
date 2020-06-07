import { Message } from "discord.js";
import fetch from "node-fetch";
import cheerio from "cheerio";
import { Command } from "./commands";
import { mkCommand } from "./commands_util";

export const Google: Command = {
    cmd: "google",
    usage: mkCommand("google") + " <your> <search> <keywords>",
    help: "replies with the first result from google",
    handle: (params: string[], msg: Message) => {
        const searchUrl = "http://www.google.com/search?q=" + params.join("%20") + "&btnI";
        fetch(searchUrl)
            .then(resp => {
                if (resp.ok) {
                    resp.text().then(txt => {
                        const $ = cheerio.load(txt);
                        const links = $('a');

                        if (links.length == 2) {
                            const redirect = links[0].attribs.href;
                            msg.channel.send(redirect);
                        } else {
                            const results = Object.keys(links)
                                .filter((key: string) => (links as any)[key].attribs && (links as any)[key].attribs.href)
                                .map((key: string) => (links as any)[key].attribs.href)
                                .filter((url: string) => url.startsWith("/url?q="))//
                                .map((url: string)  => url.slice(7))
                                .map((url: string)  => url.split("&sa=U&")[0]);
                            if (results.length > 0) {
                                msg.channel.send(results[0]);
                            } else {
                                msg.channel.send("😔Sorry, can't fetch the first link...")
                                msg.channel.send("💡Try this instead: " + searchUrl);
                            }
                        }
                    });
                }
            });
    }
}