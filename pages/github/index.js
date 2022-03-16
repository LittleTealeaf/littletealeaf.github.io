import Header from '../../components/header'
import events from '../../assets/generated/events.json'
import GithubEvent from '../../components/githubevent'

export default function Home() {
    return (
        <div>
            <Header path={["github"]}/>
            I AM A GITHUB BIRD
            <div>
                {
                    events.map((event,i) => (
                        <GithubEvent key={i} event={event} />
                    ))
                }
            </div>
        </div>
    )
}