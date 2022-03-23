import { Emojis } from "../libs/assets";


export default function GithubEmoji({name}) {
    url = "";
    Emojis.array.forEach(element => {
        if (element.name == name) {
            url = element.url;
        }
    });
    return (
        <img src={url} alt={name} />
    )
}