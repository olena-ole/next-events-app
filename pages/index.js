import { getFeaturedEvents } from "../helpers/api-utils"

import EventList from "../components/events/event-list";
export default function HomePage(props) {
    const { featuredEvents } = props

    return (
        <div>
            <EventList items={featuredEvents}/>
        </div>
    )
}

export async function getStaticProps() {

    const featuredEvents = await getFeaturedEvents()

    return {
        props: {
            featuredEvents: featuredEvents
        },
        revalidate: 20
    }
}