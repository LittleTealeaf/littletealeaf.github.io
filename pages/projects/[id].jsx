

export default function Page({}) {
    return (
        <>
        <div>
            well this is awkward
        </div>
        </>
    )
}


export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            id: params.id
        }
    }
}