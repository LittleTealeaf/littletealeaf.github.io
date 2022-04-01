import { Emojis } from "../libs/assets";

export default function GithubEmoji({name, style}) {
    const emoji = Emojis[name];
    return emoji != null ? <img src={emoji} alt={name} style={style}/> : <></>
}