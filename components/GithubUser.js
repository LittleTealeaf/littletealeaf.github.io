import { getAsset } from "../libs/assets";


export default function GithubUser({user_ref,size}) {
    const user = getAsset(user_ref);
    const dimension = size == null ? "30" : size;

    return (user.avatar != null ? (
        <a href={user.html_url} alt={user.login}>
            <img alt={user.login} src={getAsset(user.avatar)} width={dimension} height={dimension} />
        </a>
    ) : (<></>));

}