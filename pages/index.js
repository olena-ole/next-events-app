import Head from 'next/head'

import { getFeaturedEvents } from "../helpers/api-utils"
import EventList from "../components/events/event-list";

export default function HomePage(props) {
    const { featuredEvents } = props

    return (
        <div>
            <Head>
                <title>Featured Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..."/>
            </Head>
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
        revalidate: 1800
    }
}