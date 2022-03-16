import Header from '../../components/header'
import { Events } from '../../libs/assets'
import GithubEvent from '../../components/githubevent'

export default function Home() {
    return (
        <div>
            <Header path={["github"]}/>
            I AM A GITHUB BIRD
            <div>
                {
                    Events.map((event,i) => (
                        <GithubEvent key={i} event={event} />
                    ))
                }
            </div>
        </div>
    )
}